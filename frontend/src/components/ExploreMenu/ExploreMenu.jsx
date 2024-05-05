import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category , setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>EXPLORE OUR MENU</h1>
        <p className='explore-menu-text'> Discover new flavors, savor timeless classics, and elevate your dining experience with our curated selection of culinary delights.</p>
        <div className='explore-menu-list'>
            {menu_list.map((item , index)=>{
               return (
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/>
                    <p>{item.menu_name}</p>
                </div>
               )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu
