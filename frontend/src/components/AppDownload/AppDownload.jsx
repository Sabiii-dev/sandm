import React from 'react'
import "./AppDownload.css"
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>

        <div className='app-download-platforms'>
            <img src={assets.oil1} />
            <img className='imggg' src={assets.oil2} />
            <img src={assets.oil3}/>
        </div>
    </div>
  )
}

export default AppDownload
