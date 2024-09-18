import React, { useContext, useState, useEffect } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = () => {
    const { food_list } = useContext(StoreContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (food_list.length > 0) {
            setLoading(false)
        }
    }, [food_list])

    return (
        <div className='food-display' id='food-display'>
            <h2>Premium Oils for a Healthier You</h2>
            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner-circle"></div>
                    <p>Loading...</p>
                </div>
            ) : (
                <div className='food-display-list'>
                    {food_list.map((item) => (
                        <FoodItem
                            key={item._id}
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default FoodDisplay
