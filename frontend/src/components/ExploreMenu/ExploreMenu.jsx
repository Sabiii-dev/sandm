import React, { useEffect } from 'react';
import "./ExploreMenu.css";
import { menu_list } from '../../assets/assets';
import Typed from 'typed.js';

const ExploreMenu = ({ category, setCategory }) => {
  useEffect(() => {
    const typed = new Typed('.auto-type', {
      strings: ["Fresh", "Flavorful", "Fast"],
      typeSpeed: 150,
      backSpeed: 150,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className='explore-menu' id='explore-menu'>
      <div className='mytitle'>
        <h1 className='before'>Discover Delicious Dishes <span className='auto-type'></span></h1>
      </div>
      <div className='explore-menu-list'>
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt='' />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
