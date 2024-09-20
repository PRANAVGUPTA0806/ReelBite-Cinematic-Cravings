import React, { useState,useEffect,useContext } from 'react'
import Navbar from '../Component/Navbar/Navbar3'
import './AddtoCart.css';
import CartItem from './CartItem';
import { MovieContext } from '../Context/MovieContext';
import './Exit34.css';
import movie from '../Food/pics6/make.jpg'

function AddtoCart() {
  
  function Footer13431() {
    return (
      <footer className='rrrrr'>
        <div className="social-links334">
          <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com/LOGIN"><i className="fab fa-twitter"></i></a>
          <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
          <a href="https://in.pinterest.com/"><i className="fab fa-pinterest"></i></a>
        </div>
        <span style={{ color: "white" }}>ReelBite: Cinematic Cravings Food Page</span>
      </footer>
    );
  }
  const[quantityAdd,setQuantityAdd] = useState(false);
 
  const[allproducts,setAllProducts]=useState([]);
  const fetchInfo =async()=>{
    const token = localStorage.getItem('auth-token'); // Retrieve the token
    
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }
    await fetch('http://localhost:8000/api/my-orders', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` // Include token for authentication
        }}).then((res)=>res.json()).then((data)=>{
      setAllProducts(data)
    });
  }
  useEffect(()=>{
    fetchInfo();
  },[])

  const [exitIntent, setExitIntent] = useState(false);

  useEffect(() => {
    const handleMouseLeave = () => {
      setExitIntent(true);
    };

    const handleMouseOut = (event) => {
      if (event.clientY < 0 && exitIntent) {
        document.getElementById('exit-popup1121').style.display = 'block';
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [exitIntent]);

  const handleClosePopup = () => {
    document.getElementById('exit-popup1121').style.display = 'none';
  };
  const{cartItems,cartItem,item,itema} = useContext(MovieContext)
  return (
    
    <div className='cartWrapper'>
        <Navbar quantityAdded = {quantityAdd}/>
        <div className='cartContainer' >
    
          <div className='CartLeft'>
            <div className='cartHeader'>
           
              <div className='headerLeft'>
                  <h3>OrderDetails</h3>
              </div>
              <div className='headerRight'>
              {/* <h3>Details</h3> */}
              <h3>Total Price</h3>
              <h3>Payment Details</h3>
              <h3>Order Date&Time</h3>
              </div>
            </div>
            {allproducts.length > 0 ? (
            allproducts.map((order, index) => (
              <CartItem
                key={order._id}
                item={order}
              />
            ))) : (
            <p>No orders yet:)</p>
            )}
            
            
          </div>
        
        </div>

         

        <Footer13431/>
        <div id="exit-popup1121" style={{ display: 'none' }} >
            <h2>Don't Leave Yet!</h2>
            <h4>We have an exciting offer for you: </h4>
            <h4>Use Promocode 'Food233' to get 30% Cashback <br />on total food price, upto Rs. 100.</h4>
            <img src={movie} alt="Offer" width="250" height="250" />
        <br />
        <button id='continue-button'onClick={handleClosePopup}>Continue</button>
      </div>
    </div>
    
  )
}

export default AddtoCart