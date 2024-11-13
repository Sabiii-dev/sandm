import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const MyOrders = () => {
    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([])
    const [searchMethod, setSearchMethod] = useState('email')
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await axios.post(
                `${url}/api/order/loginuserorders`,
               {},
                { headers: { token } }
            )
            console.log("response",response)
            setData(response.data.data)
        } catch (error) {
            console.error(error)
            toast.error("Error fetching orders")
        } finally {
            setLoading(false)
        }
    }

    const searchOrders = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const searchData = searchMethod === 'email' 
                ? { customerEmail: searchValue }
                : { customerPhone: searchValue }

            const response = await axios.post(`${url}/api/order/userorders`, searchData)
            
            if (response.data.success) {
                setData(response.data.data)
                if (response.data.data.length === 0) {
                    toast.info("No orders found")
                }
            } else {
                toast.error("Failed to fetch orders")
            }
        } catch (error) {
            console.error(error)
            toast.error("Error searching orders")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    }, [token])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>

            {!token && (
                <div className='search-container'>
                    <form onSubmit={searchOrders}>
                        <select 
                            value={searchMethod}
                            onChange={(e) => setSearchMethod(e.target.value)}
                        >
                            <option value="email">Email</option>
                            <option value="phone">Phone</option>
                        </select>
                        <input
                            type={searchMethod === 'email' ? 'email' : 'tel'}
                            placeholder={`Enter your ${searchMethod}`}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Searching...' : 'Find Orders'}
                        </button>
                    </form>
                </div>
            )}

            <div className='container'>
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : data?.length === 0 ? (
                    <div className="no-orders">
                        {token 
                            ? "You haven't placed any orders yet."
                            : "Enter your email or phone to view your orders."
                        }
                    </div>
                ) : (
                    data?.map((order, index) => (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt=''/>
                            <p>{order.items.map((item, index) => (
                                item.name + " x " + item.quantity + 
                                (index === order.items.length - 1 ? '' : ' , ')
                            ))}</p>
                            <p>RS {order.amount.toFixed(2)}</p>
                            <p>items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <div className="order-contact">
                                <p>Name: {order.customerName}</p>
                                <p>Contact: {order.customerEmail || order.customerPhone}</p>
                            </div>
                            <button onClick={fetchOrders}>
                                Refresh Status
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default MyOrders