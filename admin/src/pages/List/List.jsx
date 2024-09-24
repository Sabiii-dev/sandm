import React, { useEffect, useState } from 'react';
import "./List.css";
import axios from "axios";
import { toast } from 'react-toastify';

const List = ({ url }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error fetching food items");
        }
    };

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='list add flex-col'>
            <p>All Food List</p>
            <div className='list-table'>
                <div className='list-table-format title'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>

                {list.map((item, index) => (
                    <div key={index} className='list-table-format'>
                        <img src={item.image} alt="Food" />
                        <p>{item.name}</p>
                        <p>RS {item.price}</p>
                        <p onClick={() => removeFood(item._id)} className='delete'>Remove</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
