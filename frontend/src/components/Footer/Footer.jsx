import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
        <div className='footer-content-left'>
        <img className='my_logo_web' src={assets.my_logo_web} />
        <p>r, the fluctuations in bounce rate suggest that user engagement levels vary,
indicating areas for potential improvement in website design, content, or marketing
strategies</p>
<div className='footer-social-icons'>
    <a href=''><img src={assets.facebook_icon}/></a>
    <a href=''><img src={assets.twitter_icon}/></a>
    <a href=''><img src={assets.linkedin_icon}/></a>
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
