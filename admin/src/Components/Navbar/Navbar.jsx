import React from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import navlogo from '/pp1.png'
import navprofile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="logo" className="nav-logo" />
      {<button  id="btn1" onClick={()=>{window.location.href = 'http://localhost:5174/home';}}>Logout</button>
          }
      <img src={navprofile} alt="logo" className="nav-profile" />
    </div>
  )
}

export default Navbar
