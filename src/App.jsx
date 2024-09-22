import { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Cart from './pages/Cart';
import ErrorPage404 from './pages/ErrorPage404';
import Checkout from './pages/Checkout';
import Login from './pages/auth/Login';
import Navbar from './pages/includes/NavBar';
import Footer from './pages/includes/Footer';
import SignUp from './pages/auth/SignUp';
import UserEmailVerification from './pages/auth/UserEmailVerification';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import PrivateComponent from './components/PrivateComponent';
import OrderList from './pages/OrderList';
import OrderView from './pages/OrderView';
import PaymentList from './pages/PaymentList';
import PaymentView from './pages/PaymentView';

function App() {
  

  return (
    <>
    <ToastContainer/>
    <Navbar/>
     <Routes>
        <Route path='*' element={<ErrorPage404/>}/>       
        <Route path='/' element={<Home/>}/>       
        <Route path='/login' element={<Login/>}/>       
        <Route path='/signup' element={<SignUp/>}/>       
        <Route path='/forgot-password' element={<ForgotPassword/>}/>       
        <Route path='/reset-password/:token' element={<ResetPassword/>}/>       
        <Route path='/user-email-verification/:id' element={<UserEmailVerification/>}/>       
        <Route path='/about-us' element={<AboutUs/>}/>       
        <Route path='/contact-us' element={<ContactUs/>}/>       
        <Route path='/cart' element={<Cart/>}/>       
        {/* authenticated routes  */}
        <Route element={<PrivateComponent/>}> 
          <Route path='/checkout' element={<Checkout/>}/>  
          <Route path='/orders' element={<OrderList/>}/>  
          <Route path='/order-view/:id' element={<OrderView/>}/>  
          <Route path='/payments' element={<PaymentList/>}/>  
          <Route path='/payment-view/:id' element={<PaymentView/>}/>  

        
        </Route>
     </Routes>

    <Footer/>

    </>
  )
}

export default App
