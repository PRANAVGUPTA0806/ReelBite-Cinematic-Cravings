import React, { useState, useEffect } from 'react';
import Home1 from './Home/Home1';
import Home from './Home/Home';
import Signup from './Signup/Signup';
import About from './About/About';
import Contactus from './Contantus/Contanctus';
import Login from './Login/Login';
import { Routes, Route,Navigate } from 'react-router-dom';
import Movies from './Movies/Movies';
import PasswordReset from './PasswordReset/PasswordReset';
import Food from './Food/Food';
import AddtoCart from './AddtoCart/AddtoCart';
import AllOrders from './AllOrders/AddtoCart';
import { MovieContextProvider } from './Context/MovieContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ProductDetails from './Component/ProductDetails';
import ErrorPage from './Component/ErrorPage';
import ProtectedRoute from './Component/ProtectedRoute';
import MyAccount from './Component/MyAccount';
import ProtectedRoute1 from './Component/ProtectedRoute1';

const App = () => {
  
  return (
   
    <PayPalScriptProvider 
    options={{"client-id":'AddyemWhe6sF9c4sR1O00p3Mz8tffOHvRV9Qn3mxwEOYOJyFA58mOY8d5KIRA171biFgAGf0EIyfJr0a'}}
  >
    <>
    <MovieContextProvider>
     
      <div>
        <Routes>
          <Route path='/' element={<Home1/>}/>
          <Route path='/home' element={<ProtectedRoute element={Home}/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contactus/>}/>
          <Route path='/login' element={<ProtectedRoute1 element={Login}/>}/>
          <Route path='/sign' element={<ProtectedRoute1 element={Signup}/>}/>
          <Route path='/movies' element={<Movies/>}/>
          <Route path='/food' element={<Food/>}/>
          <Route path='/addcart' element={<AddtoCart/>}/>
          <Route
          path="/account"
          element={<ProtectedRoute element={MyAccount} />}
          />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path='/myorders' element={<AllOrders/>}/>
          <Route path="/reset-password/:resetToken" element={<ProtectedRoute1 element={PasswordReset}/>} />
          <Route path="error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </div>
     
      </MovieContextProvider>
      </>
      </PayPalScriptProvider>
    
  );
};

export default App;
