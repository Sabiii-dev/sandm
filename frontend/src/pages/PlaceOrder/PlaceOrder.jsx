import React, { useContext, useState } from 'react';
import "./PlaceOrder.css";
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrder = () => {
    const { getTotalCartAmount, food_list, cartItems, url, token } = useContext(StoreContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (event) => {
        event.preventDefault();

        if (Object.keys(cartItems).length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        try {
            // Prepare order items
            let orderItems = [];
            food_list.forEach((item) => {
                if (cartItems[item._id] > 0) {
                    orderItems.push({
                        ...item,
                        quantity: cartItems[item._id]
                    });
                }
            });

            // Prepare order payload
            const orderPayload = {
                items: orderItems,
                amount: getTotalCartAmount(),
                customerName: `${data.firstName} ${data.lastName}`,
                customerEmail: data.email,
                customerPhone: data.phone,
                address: {
                    street: data.street,
                    city: data.city,
                    state: data.state,
                    zipcode: data.zipcode,
                    country: data.country
                }
            };

            // Add userId if user is logged in
            if (token) {
                const userId = localStorage.getItem('userId');
                if (userId) {
                    orderPayload.userId = userId;
                }
            }

            // Configure request headers
            const config = token ? { headers: { token } } : {};

            // Send order request
            const response = await axios.post(`${url}/api/order/place`, orderPayload, config);

            if (response.data.success) {
                toast.success("Order placed successfully!");
                // Clear cart items (you'll need to add this to your context)
                // setCartItems({});
                navigate('/myorders');
            } else {
                toast.error(response.data.message || "Failed to place order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error(error.response?.data?.message || "Error placing order");
        }
    };

    return (
        <div className='place-order-container'>
            <form onSubmit={handlePlaceOrder} className='place-order'>
                <div className='place-order-left'>
                    <p className='title'>Delivery Details</p>
                    <div className='multi-fields'>
                        <input 
                            required 
                            name='firstName' 
                            onChange={onChangeHandler} 
                            value={data.firstName} 
                            type='text' 
                            placeholder='First Name' 
                        />
                        <input 
                            required 
                            name='lastName' 
                            onChange={onChangeHandler} 
                            value={data.lastName} 
                            type='text' 
                            placeholder='Last Name' 
                        />
                    </div>
                    <input 
                        required 
                        name='email' 
                        onChange={onChangeHandler} 
                        value={data.email} 
                        type='email' 
                        placeholder='Email' 
                    />
                    <input 
                        required 
                        name='street' 
                        onChange={onChangeHandler} 
                        value={data.street} 
                        type='text' 
                        placeholder='Street' 
                    />
                    <div className='multi-fields'>
                        <input 
                            required 
                            name='city' 
                            onChange={onChangeHandler} 
                            value={data.city} 
                            type='text' 
                            placeholder='City' 
                        />
                        <input 
                            required 
                            name='state' 
                            onChange={onChangeHandler} 
                            value={data.state} 
                            type='text' 
                            placeholder='State' 
                        />
                    </div>
                    <div className='multi-fields'>
                        <input 
                            required 
                            name='zipcode' 
                            onChange={onChangeHandler} 
                            value={data.zipcode} 
                            type='text' 
                            placeholder='Zip Code' 
                        />
                        <input 
                            required 
                            name='country' 
                            onChange={onChangeHandler} 
                            value={data.country} 
                            type='text' 
                            placeholder='Country' 
                        />
                    </div>
                    <input 
                        required 
                        name='phone' 
                        onChange={onChangeHandler} 
                        value={data.phone} 
                        type='tel' 
                        placeholder='Phone Number' 
                    />
                </div>
                <div className='place-order-right'>
                    <div className='cart-total'>
                        <h2>Cart Totals</h2>
                        <div>
                            <div className='cart-total-details'>
                                <p>Subtotal</p>
                                <p>RS {getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className='cart-total-details'>
                                <p>Delivery Fee</p>
                                <p>RS 0</p>
                            </div>
                            <hr />
                            <div className='cart-total-details'>
                                <b>Total</b>
                                <b>RS {getTotalCartAmount()}</b>
                            </div>
                        </div>
                        <button 
                            type='submit'
                            className='place-order-button'
                            disabled={Object.keys(cartItems).length === 0}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PlaceOrder;