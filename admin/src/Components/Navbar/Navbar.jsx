import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import navlogo from '/pp1.png'
import navprofile from '../../assets/nav-profile.svg'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
      <Link to='/home'><img src={navlogo} alt="logo" className="nav-logo" /></Link>
          {localStorage.getItem('auth-token')?<button  id="btn2" onClick={()=>{localStorage.removeItem('auth-token');navigate('/')}}>Logout</button>
          :<Link  style={{ textDecoration: "None" }} id="btn2" className="btn btn-full" to='/login'>Log In</Link>}
     <Link to='/account'><img src={navprofile} alt="logo" className="nav-profile" /></Link> 
    </div>
  )
}

export default Navbar
