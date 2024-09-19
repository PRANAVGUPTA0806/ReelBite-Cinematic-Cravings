import React ,{ useState } from 'react'
import Home1 from './Home/Home1';
import Home from './Home/Home';
import Signup from './Signup/Signup';
import App1 from './App1';
import PasswordReset from './PasswordReset/PasswordReset';
import { Routes, Route } from 'react-router-dom';
import AddFoodProduct from './Components/AddProduct/AddFoodProduct';
import AddMovieProduct from './Components/AddProduct/AddMovieProduct';
import MovieProduct from './Components/MovieProduct/MovieProduct';
import FoodProduct from './Components/FoodProduct/FoodProduct';
import AllOrder from './Components/AllOrder/AllOrder';

function App() {

  return (
    <div>
       <Routes>
          <Route path='/' element={<Home1/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/admin/' element={<App1/>}>
              <Route path='addfoodproduct' element={<AddFoodProduct/>}/>
           <Route path='addmovieproduct' element={<AddMovieProduct/>}/>
            <Route path='movieproduct' element={<MovieProduct/>}/>
            <Route path='foodproduct' element={<FoodProduct/>}/>
            <Route path='allorders' element={<AllOrder/>}/>
          </Route>
          <Route path='/login' element={<Signup/>}/>
          <Route path="/reset-password/:resetToken" element={<PasswordReset />} />
          
        </Routes>
      
    </div>
  )
}

export default App
