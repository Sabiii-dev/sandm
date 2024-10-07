import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'; // Import TikTok and Instagram icons


const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
        <div className='footer-content-left'>
        <img className='my_logo_web' src={assets.my_web_logo} />
        <p>Welcome to S&M Organics, where we believe in the power of nature to nourish and rejuvenate your hair. Our premium hair oils are meticulously crafted from a blend of organic herbs and natural oils, designed to promote healthy growth, enhance shine, and restore vitality. At S&M Organics, we prioritize quality and sustainability, ensuring that every bottle is free from harmful chemicals and filled with the goodness of nature. Discover the difference of organic hair care and let your hair thrive with the healing properties of our unique formulations.</p>
<div className='footer-social-icons'>
<a href="https://www.instagram.com/sandm._.organics?igsh=MWxkeTlvZzd0YmFheg==" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} size="2x" style={{ marginRight: "10px" }} />
      </a>
      <a href="https://www.tiktok.com/@sandm._.organics?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTiktok} size="2x" />
      </a>
</div>
        </div>
        <div className='footer-content-center'>
    <h2>COMPANY</h2>
    <ul>
        <Link to={'/'}><li>HOME</li></Link>
        {/* <li>ABOUT US</li> */}
        <Link to={'/myorders'}><li>DELIVERY</li></Link>
        <li>PRIVACY POLICY</li>
    </ul>
</div>
 <div className='footer-content-right'>
    <h2>GET IN TOUCH</h2>
    <ul>
        <li>+92 301 7527011</li>
        <li>Sandm.organics.pk@gmail.com</li>
    </ul>
</div>
        </div>
        <hr/>
        <p>copyright © 2024 STAY with S&M</p>
    </div>
  )
}

export default Footer
