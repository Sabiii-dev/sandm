import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
        <div className='footer-content-left'>
        <img src={assets.logo} />
        <p>r, the fluctuations in bounce rate suggest that user engagement levels vary,
indicating areas for potential improvement in website design, content, or marketing
strategies</p>
<div className='footer-social-icons'>
    <img src={assets.facebook_icon}/>
    <img src={assets.twitter_icon}/>
    <img src={assets.linkedin_icon}/>
</div>
        </div>
        <div className='footer-content-center'>
    <h2>COMPANY</h2>
    <ul>
        <li>HOME</li>
        <li>ABOUT US</li>
        <li>DELIVERY</li>
        <li>PRIVACY POLICY</li>
    </ul>
</div>
 <div className='footer-content-right'>
    <h2>GET IN TOUCH</h2>
    <ul>
        <li>03366503733</li>
        <li>bilalxd512@gmail.com</li>
    </ul>
</div>
        </div>
        <hr/>
        <p>copyright © 2024 STAY with BHALI</p>
    </div>
  )
}

export default Footer
