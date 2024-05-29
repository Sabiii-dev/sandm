import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AllData.css';
import { assets } from '../../assets/assets';
import html2pdf from 'html2pdf.js';

const AllData = () => {
    const [allfood, setAllFood] = useState([]);
    const [allusers, setAllUsers] = useState([]);
    const [allorders, setAllOrders] = useState([]);

    const foodData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/alldata/fooddata");
            setAllFood(response.data.allFoods); 
        } catch (error) {
            console.log(error);
        }
    }

    const userData = async () => {
        try {
            const response2 = await axios.get("http://localhost:4000/api/alldata/userdata");
            setAllUsers(response2.data.allUsers);
        } catch (error) {
            console.log(error);
        }
    }

    const orderData = async () => {
        try {
            const response3 = await axios.get("http://localhost:4000/api/alldata/orderdata");
            console.log(response3.data.allOrders);
            setAllOrders(response3.data.allOrders);
        } catch (error) {
            console.log(error);
        }
    }

    const downloadPDF = () => {
        const element = document.getElementById('content-to-print');
        const opt = {
            margin: 1,
            filename: 'webpage.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    }

    useEffect(() => {
        foodData();
        userData();
        orderData();
    }, []);

    return (
        <div>
            <button onClick={downloadPDF} className="download-btn">Download as PDF</button>
            <div id="content-to-print">
                <div className='allfData'>
                    <h1>ALL FOOD DATA</h1>
                    <div className='header'>
                        <p>Name</p>
                        <p>Category</p>
                        <p>Price</p>
                    </div>
                    {allfood.map((item, index) => (
                        <div key={index} className='allFoodData'>
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                        </div>
                    ))}
                </div>
                <div className='alluData'>
                    <h1>REGISTERED USERS DATA</h1>
                    <div className='header2'>
                        <p>Name</p>
                        <p>Email</p>
                    </div>
                    {allusers.map((item, index) => (
                        <div key={index} className='allUsersData'>
                            <p>{item.name}</p>
                            <p>{item.email}</p>
                        </div>
                    ))}
                </div>
                <div className='allorders'>
                    <h1>ALL ORDERS DATA</h1>
                    <div className='order-list'>
                        {allorders.map((order, index) => (
                            <div key={index} className='order-item1'>
                                <img src={assets.parcel_icon} alt='' />
                                <div>
                                    <p className='order-item-food1'>
                                        {order.items.map((item, itemIndex) => {
                                            if (itemIndex === order.items.length - 1) {
                                                return `${item.name} x ${item.quantity}`;
                                            } else {
                                                return `${item.name} x ${item.quantity}, `;
                                            }
                                        })}
                                    </p>
                                    <p className='order-item-name1'>{order.address.firstName + " " + order.address.lastName}</p>
                                    <div className='order-item-address1'>
                                        <p className='order-item-address1'>{order.address.street + ","}</p>
                                        <p className='order-item-address1'>{order.address.city + " , " + order.address.state + " , " + order.address.country + " , " + order.address.zipcode}</p>
                                    </div>
                                    <p className='order-item-phone'>{order.address.phone}</p>
                                </div>
                                <p>Items: {order.items.length}</p>
                                <p>${order.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllData;
