import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import MyOrders from './pages/MyOrders/MyOrders'
import Shipping from './components/Shipping/Shipping'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import { Verify } from 'crypto'


const App = () => {

  const [showLogin , setShowLogin] = useState(false)

  return (
   <>
   <ToastContainer/>
   {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
   <Shipping/>
     <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order" element={<PlaceOrder/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer />
   </>
  )
}

export default App
