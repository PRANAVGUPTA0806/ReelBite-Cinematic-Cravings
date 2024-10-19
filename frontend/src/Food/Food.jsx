import React, { useState, useEffect,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Food.css'
import blankproduct from "../assets/nop.png";
import Navbar1 from '../Component/Navbar1/Navbar1';
import movie from './pics6/make.jpg'
import './Exit49.css'
import { fooditems } from '../Data';
import Comment from '../Comments/Comment'
import StarRate from '../Component/StarRating/StarRate';
import { MovieContext } from '../Context/MovieContext';
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

function Footer1343() {
    return (
      <footer className='rrrr'>
        <div className="social-links33">
          <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com/LOGIN"><i className="fab fa-twitter"></i></a>
          <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
          <a href="https://in.pinterest.com/"><i className="fab fa-pinterest"></i></a>
        </div>
        <span style={{ color: "white" }}>ReelBite: Cinematic Cravings Food Page</span>
      </footer>
    );
  }
const Food = ()=>{
  // const {addToFoodCart, CartItems} = useContext(MovieContext)
  const [movieItems, setMovieItems] = useState([]);
  const [exitIntent, setExitIntent] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const[quantityAdd,setQuantityAdd] = useState(false);
  const navigate=useNavigate();
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Use navigate to go to the product details page
  };


  useEffect(() => {

    const fetchMovies = async () => {
      try {
        console.log('Backend URL:', import.meta.env.VITE_BACKEND_URL);

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/foodproducts/all`);
        const data = await response.json();
        setMovieItems(data); // Store fetched movie data in state
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchMovies();

    const handleMouseLeave = () => {
      setExitIntent(true);
    };

    const handleMouseOut = (event) => {
      if (event.clientY < 0 && exitIntent) {
        document.getElementById('exit-popup111').style.display = 'block';
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
    document.getElementById('exit-popup111').style.display = 'none';
  };
  const filteredMovies = movieItems.filter((movie) =>
    movie.productName.toLowerCase().includes(searchTerm)
  );
  const addToCart = async (productId, quantity = 1) => {
    setQuantityAdd(false);
    const t=localStorage.getItem('auth-token');
    if(!t){
      toast.error('Failed to add Food to cart:Login/Signup first');
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}` // Add auth token if user is logged in
        },
        body: JSON.stringify({ productId, quantity })
      });

      if (!response.ok) {
        toast.error('Failed to add item to cart');
        throw new Error('Failed to add item to cart');
      }

      const data = await response.json();
      setQuantityAdd(true);
      toast.success('Food item added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Error adding product to cart');
    }
  };

    return(
        <>
        <div className='wrapper'>
            <Navbar1 setSearchTerm={setSearchTerm} quantityAdded = {quantityAdd}/>
            <div className='movieContainer'>
          <div className='movieitemdiv'>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((data, index) => (
              <div key={index} className='movieCardCont'>
                <img className='movieCardImg' src={data.image} alt={data.name}  onClick={() => handleProductClick(data._id)} // Navigate to the product details page on click
                    style={{ cursor: "pointer" }} />
                <div className='movieCardRate'  onClick={() => handleProductClick(data._id)} // Navigate to the product details page on click
                    style={{ cursor: "pointer" }} >
                  <span>{data.productName}</span>
                  </div>
                <div className='movieCardRate' >
                  <StarRate userId={localStorage.getItem("id")} productId={data._id} productModel="foods" />
                </div>
                {/* <span>{data.category}</span><br /> */}
                <span>${data.productPrice}</span>
                <span>Available: {data.available ? "Yes" : "No"}    </span>
                {data.available ? ( // Render button only if product is available
              <button className='com' onClick={() => addToCart(data._id)}>Buy Food</button>
            ) : (
              <p style={{ color: 'red' }}>This product is currently unavailable.</p>
            )}
                
                {/* <Comment productId={data._id}/> */}
              </div>
            ))
          ) : (
            <div className="blankCartContainer2">
                  <img src={blankproduct} alt="Empty cart" />
                  <div className="cartHeading2">
                  </div>
                </div>)}
          </div>
        </div>
            <Footer1343/>
            <div id="exit-popup111" style={{ display: 'none' }} >
            <h2>Don't Leave Yet!</h2>
            <h4>We have an exciting offer for you: </h4>
            <h4>Use Promocode 'Food233' to get 30% Cashback <br />on total food price, upto Rs. 100.</h4>
            <img src={movie} alt="Offer" width="250" height="250" />
        <br />
        <button id='continue-button'onClick={handleClosePopup}>Continue</button>
      </div>
        </div>
        <ToastContainer />
        </>
    )
}

export default Food