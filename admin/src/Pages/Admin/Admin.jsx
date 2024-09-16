import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import MovieProduct from '../../Components/MovieProduct/MovieProduct'
import FoodProduct from '../../Components/FoodProduct/FoodProduct'
import AddFoodProduct from '../../Components/AddProduct/AddFoodProduct'
import AddMovieProduct from '../../Components/AddProduct/AddMovieProduct'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
      <Route path='/addfoodproduct' element={<AddFoodProduct/>}/>
        <Route path='/addmovieproduct' element={<AddMovieProduct/>}/>
        <Route path='/movieproduct' element={<MovieProduct/>}/>
        <Route path='/foodproduct' element={<FoodProduct/>}/>
      </Routes>

    </div>
  )
}

export default Admin
