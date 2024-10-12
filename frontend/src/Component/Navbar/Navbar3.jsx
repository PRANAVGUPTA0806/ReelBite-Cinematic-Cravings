import React, { useState, useEffect ,useContext} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar3.css'
import bg1 from '/pp1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faCartShopping } from '@fortawesome/free-solid-svg-icons'
const Navbar3 = ({quantityAdded})=>{
    
    const navigate = useNavigate();
    const handleCart = ()=>{
        navigate('/addcart')
    }
    const [total1, setTotal] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const fetchMovieCartItems = async () => {
          const token = localStorage.getItem('auth-token'); // Retrieve the token
    
      if (!token) {
        console.log('No token found in localStorage');
        return;
      }
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/`,{
                  method:'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` // Set the Authorization header
                  }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                
                setTotal(data.totalQuantity)
            } catch (error) {
                setErrorMessage('Failed to load  cart items: ' + error.message);
            }
        };
    
        fetchMovieCartItems();
    }, [quantityAdded]);
    return(
        <>
        <div className="Navwrapper">
            <div className="Navcontainer">
                <div className="Navlogodiv">
                    <div className="Navlogoimg">
                        <img src={bg1} />
                    </div>
                    <div className="Navlogotext">
                    <span>ReelBite:</span>
                    <span>Cinematic Cravings</span>
                    </div>      
                </div>
                <div className="Navheaderdiv">
                    <ul>
                    {localStorage.getItem('auth-token')?<li><Link to='/home' style={{ textDecoration: "None" }}>Home</Link></li>
          :<li><Link  style={{ textDecoration: "None" }}   to='/'>Home</Link></li>}
                        <li><Link to='/movies' style={{ textDecoration: "None" }}>Movies</Link></li>
                        <li><Link to='/food' style={{ textDecoration: "None" }}>Food</Link></li>
                        <li><Link to='/contact' style={{ textDecoration: "None" }}>ContactUs</Link></li>
                        <li><Link to='/myorders' style={{ textDecoration: "None" }}>Orders</Link></li>
                    </ul>
                </div>
                <div className="NavSearchdiv">
                    <div className="NavSearchcont">
                        <input type="text" placeholder="Search..... "/>
                        <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                    </div>
                    <div className='cart1'>
                        <Link to='/addcart'><span style={{color:"white"}}  ><FontAwesomeIcon icon={faCartShopping} /></span></Link>
                        
                 
                    </div>
                    <div className='basket'>{total1}</div>
                    <div>
                    <li><Link to='/account' ><img src={localStorage.getItem('avatar')?localStorage.getItem('avatar'):"https://res.cloudinary.com/dwprhpk9r/image/upload/v1728546051/uploads/product_1728546048771.png.png"} alt="logo" className="nav-profile" /></Link> </li>
                    </div>
                    
                    {localStorage.getItem('auth-token')?<button  id="btn1" onClick={()=>{localStorage.removeItem('auth-token');localStorage.removeItem('id');localStorage.removeItem('avatar');window.location.replace('/addcart')}}>Logout</button>
          :<Link  style={{ textDecoration: "None" }} id="btn1" className="btn btn-full" to='/login'>Login</Link>}
                </div>
            </div>
        </div>
        </>
    )
}

export default Navbar3;