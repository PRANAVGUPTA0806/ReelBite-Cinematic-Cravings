import React, { useState,useEffect,useContext } from 'react'
import Navbar from '../Component/Navbar/Navbar3'
import './AddtoCart.css';
import blankCart from "../assets/emptyCart.svg";
import { movieitems ,fooditems } from '../Data'; 
import CartItem from './CartItem';
import { MovieContext } from '../Context/MovieContext';
import './Exit34.css';
import movie from '../Food/pics6/make.jpg'
import CartFooter from './CartFooter';

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
  const [movieCartItems, setMovieCartItems] = useState([]);
  const [foodCartItems, setFoodCartItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [total1, setTotal] = useState(0);
  const[quantityAdd,setQuantityAdd] = useState(false);
  const[cartdata,setCartdata]=useState([]);

  // Fetch movie cart items from the backend
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
            setMovieCartItems(data.items || []);
            setCartdata(data);
            
            setTotal(data.totalPrice)
        } catch (error) {
            setErrorMessage('Failed to load  cart items: ' + error.message);
        }
    };

    fetchMovieCartItems();
}, []);

const handleAddQuantity = async (productId) => {
  setQuantityAdd(false);
  const token = localStorage.getItem('auth-token');
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    const updatedCart = await response.json();
    setQuantityAdd(true);
    setMovieCartItems(updatedCart.items);
    setTotal(updatedCart.totalPrice);
  } catch (error) {
    setErrorMessage('Error updating cart: ' + error.message);
  }
};

const handleRemoveQuantity = async (productId) => {
  setQuantityAdd(false);
  const token = localStorage.getItem('auth-token');
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    const updatedCart = await response.json();
    setMovieCartItems(updatedCart.items);
    setQuantityAdd(true);
    setTotal(updatedCart.totalPrice);
  } catch (error) {
    setErrorMessage('Error updating cart: ' + error.message);
  }
};
const handledeleteQuantity = async (productId) => {
  const token = localStorage.getItem('auth-token');
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/remove1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId}),
    });
    const updatedCart = await response.json();
    setMovieCartItems(updatedCart.items);
    setTotal(updatedCart.totalPrice);
  } catch (error) {
    setErrorMessage('Error updating cart: ' + error.message);
  }
};
 
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
                  <h3>PRODUCT</h3>
              </div>
              <div className='headerRight'>
              <h3>PRICE</h3>
              <h3>QUANTITY</h3>
              <h3>TOTAL</h3>
              </div>
            </div>
            {movieCartItems.length > 0 ? (
                    movieCartItems.map(item => (
                        <CartItem
                            key={item.productId}
                            item={item}
                            onAdd={handleAddQuantity}
                            onRemove={handleRemoveQuantity}
                            ondelete={handledeleteQuantity}
                        />
                    ))
                ) : (
                  <div className="blankCartContainer">
                  <img src={blankCart} alt="Empty cart" />
                  <div className="cartHeading">
                    <h1>Your Cart is Empty!!</h1>
                  </div>
                </div>
                )}
            
          </div>
        
        </div>

          <CartFooter  total={total1} cartItems={cartdata}/>

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