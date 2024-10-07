import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Movies.css'
import blankproduct from "../assets/nov.png";
import Navbar from '../Component/Navbar/Navbar';
import movie from './pics5/movieticket.jpg'
import './Exit19.css'
import { movieitems } from '../Data';
import Comment from '../Comments/Comment'
import StarRate from '../Component/StarRating/StarRate';
import { MovieContext } from '../Context/MovieContext'; 

function Footer134() {
  return (
    <footer className='rrr'>
      <div className="social-links3333">
        <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
        <a href="https://twitter.com/LOGIN"><i className="fab fa-twitter"></i></a>
        <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
        <a href="https://in.pinterest.com/"><i className="fab fa-pinterest"></i></a>
      </div>
      <span style={{ color: "white" }}>ReelBite: Cinematic Cravings Movies Page</span>
    </footer>
  );
}
const Movies = () => {
  // const {addToCart, CartItems,handleItem,item} = useContext(MovieContext)
  const [movieItems, setMovieItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [exitIntent, setExitIntent] = useState(false);
  const[quantityAdd,setQuantityAdd] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/moviesproducts/all`);
        const data = await response.json();
        setMovieItems(data); // Store fetched movie data in state
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();

    const handleMouseLeave = () => {
      setExitIntent(true);
    };

    const handleMouseOut = (event) => {
      if (event.clientY < 0 && exitIntent) {
        document.getElementById('exit-popup11').style.display = 'block';
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
    document.getElementById('exit-popup11').style.display = 'none';
  };
  const filteredMovies = movieItems.filter((movie) =>
    movie.productName.toLowerCase().includes(searchTerm)
  );
  const addToCart = async (productId, quantity = 1) => {
    setQuantityAdd(false);
    const t=localStorage.getItem('auth-token');
    if(!t){
      alert('Failed to add Movie to cart:Login/Signup first');
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
        throw new Error('Failed to add item to cart');
      }

      const data = await response.json();
      setQuantityAdd(true);
      alert('Movie added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add movie to cart:Login/Signup first');
    }
    
  };
  
  return (
    <>
      <div className='wrapper'>
        <Navbar setSearchTerm={setSearchTerm} quantityAdded = {quantityAdd} />
        <div className='movieContainer'>
          <div className='movieitemdiv'>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((data, index) => (
              <div key={index} className='movieCardCont'>
                <img className='movieCardImg' src={data.image} alt={data.name} />
                <div className='movieCardRate'>
                  <span>{data.productName}</span>
                  <StarRate userId={localStorage.getItem("id")} productId={data._id} productModel="movies"/>
                </div>
                <span>{data.category}</span><br />
                <span>${data.productPrice}</span>
                <button className='com' onClick={() => addToCart(data._id)}>Buy Tickets</button>
                <Comment productId={data._id} />
              </div>
            ))
          ) : (
            <div className="blankCartContainer1">
                  <img src={blankproduct} alt="Empty cart" />
                  <div className="cartHeading1">
                  </div>
                </div>)}
          </div>
        </div>
        <Footer134/>
            <div id="exit-popup11" style={{ display: 'none' }} >
            <h2>Don't Leave Yet!</h2>
            <h4>We have an exciting offer for you: </h4>
            <h4>Use Promocode 'TICKET100' to get 50% Cashback <br />on total ticket price, upto Rs. 100.</h4>
            <img src={movie} alt="Offer" width="250" height="250" />
        <br />
        <button id='continue-button'onClick={handleClosePopup}>Continue</button>
      </div>
      </div>
    </>
  )
}

export default Movies