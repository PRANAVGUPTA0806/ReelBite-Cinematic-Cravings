import React,{useEffect} from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import navlogo from '/pp1.png'
import navprofile from '../../assets/nav-profile.svg'
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem("auth-token");
    if (storedToken) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          localStorage.setItem({
            'avatar': response.data.imageUrl || "https://res.cloudinary.com/dwprhpk9r/image/upload/v1728546051/uploads/product_1728546048771.png.png",
          });
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, []);

  return (
    <div className='navbar'>
      <Link to='/home'><img src={navlogo} alt="logo" className="nav-logo" /></Link>
      <Link className="bollywood" to='/admin/allorders' style={{ color: "white", textDecoration: "none" }}>DashBoard</Link>

          {localStorage.getItem('auth-token')?<button  id="btn2" onClick={()=>{localStorage.removeItem('auth-token');localStorage.removeItem('avatar');navigate('/')}}>Logout</button>
          :<Link  style={{ textDecoration: "None" }} id="btn2" className="btn btn-full" to='/login'>Log In</Link>}
     <Link to='/account'><img src={localStorage.getItem('avatar')} alt="logo" className="nav-profile" /></Link> 
    </div>
  )
}

export default Navbar
