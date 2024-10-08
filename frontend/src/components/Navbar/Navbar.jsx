import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { assets } from "../../assets/assets"
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate('/');
    }

    return (
        <div className='navbar'>
            <Link to="/"><img className='my_logo_web' src={assets.my_web_logo} alt='logo' /></Link>
            <ul className='navbar-menu'>
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#food-items' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>How to use</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
            </ul>
            <div className='navbar-right'>
                <div className='navbar-search-icon'>
                    <Link to="/cart"><img src={assets.basket_icon} alt='' /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button>
                    : <div className='navbar-profile'>
                        <img className='bhali-img' src={assets.profile_icon} alt='' />
                        <div className='nav-profile-dropdown'>
                            <ul>
                                <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt='' /><p>Orders</p></li>
                                <hr />
                                <li onClick={logout}><img src={assets.logout_icon} alt='' /><p>Logout</p></li>
                                <hr />
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Navbar;
