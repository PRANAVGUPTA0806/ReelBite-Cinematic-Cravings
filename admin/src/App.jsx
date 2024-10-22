import React ,{ useState } from 'react'
import Home1 from './Home/Home1';
import Home from './Home/Home';
import Signup from './Signup/Signup';
import App1 from './App1';
import PasswordReset from './PasswordReset/PasswordReset';
import { Routes, Route,Navigate } from 'react-router-dom';
import AddFoodProduct from './Components/AddProduct/AddFoodProduct';
import AddMovieProduct from './Components/AddProduct/AddMovieProduct';
import MovieProduct from './Components/MovieProduct/MovieProduct';
import FoodProduct from './Components/FoodProduct/FoodProduct';
import AllOrder from './Components/AllOrder/AllOrder';
import ProtectedRoute from './Pages/ProtectedRoute';
import ErrorPage from './Pages/ErrorPage';
import MyAccount from './Pages/MyAccount';
import AllUser from './Components/AllUser/AllUser';
import ProtectedRoute1 from './Pages/ProtectedRoute1';

function App() {

  return (
    <div>
       <Routes>
          <Route path='/' element={<Home1/>}/>
          <Route path='/home' element={<ProtectedRoute element={Home}/>}/>
          <Route path='/admin/' element={<ProtectedRoute element={App1}/>}>
            <Route path='addfoodproduct' element={<AddFoodProduct/>}/>
            <Route path='addmovieproduct' element={<AddMovieProduct/>}/>
            <Route path='movieproduct' element={<MovieProduct/>}/>
            <Route path='foodproduct' element={<FoodProduct/>}/>
            <Route path='allorders' element={<AllOrder/>}/>
            <Route path='allusers' element={<AllUser/>}/>
          </Route>
          <Route path='/login' element={<ProtectedRoute1 element={Signup}/>}/>
          <Route path="error" element={<ErrorPage />} />
          <Route
          path="/account"
          element={<ProtectedRoute element={MyAccount} />}
          />
          <Route path="*" element={<Navigate to="/error" />} />
          <Route path="/reset-password/:resetToken" element={<ProtectedRoute1 element={PasswordReset}/>} />
          
        </Routes>
      
    </div>
  )
}

export default App
