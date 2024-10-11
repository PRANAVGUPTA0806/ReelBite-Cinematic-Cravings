import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import MovieProduct from '../../Components/MovieProduct/MovieProduct'
import FoodProduct from '../../Components/FoodProduct/FoodProduct'
import AddFoodProduct from '../../Components/AddProduct/AddFoodProduct'
import AddMovieProduct from '../../Components/AddProduct/AddMovieProduct'
import AllOrder from '../../Components/AllOrder/AllOrder';
import AllUser from '../../Components/AllUser/AllUser'

function Footer1() {
  return (
    <footer>
      <div className="social-links">
        <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
        <a href="https://twitter.com/LOGIN"><i className="fab fa-twitter"></i></a>
        <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
        <a href="https://in.pinterest.com/"><i className="fab fa-pinterest"></i></a>
      </div>
      <span style={{ color: "white" }}>ReelBite: Cinematic Cravings Admin's Page</span>
    </footer>
  );
}
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
      <Route path='addfoodproduct' element={<AddFoodProduct/>}/>
        <Route path='addmovieproduct' element={<AddMovieProduct/>}/>
        <Route path='movieproduct' element={<MovieProduct/>}/>
        <Route path='foodproduct' element={<FoodProduct/>}/>
        <Route path='allorders' element={<AllOrder/>}/>
        <Route path='allusers' element={<AllUser/>}/>
      </Routes>
      <Footer1 />
    </div>
  )
}

export default Admin
