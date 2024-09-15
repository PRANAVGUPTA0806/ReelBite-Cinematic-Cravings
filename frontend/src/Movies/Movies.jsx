import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Movies.css'
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
  const {addToCart, CartItems,handleItem,item} = useContext(MovieContext)
  
  const [exitIntent, setExitIntent] = useState(false);

  useEffect(() => {
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

  return (
    <>
      <div className='wrapper'>
        <Navbar />
        <div className='movieContainer'>
          <div className='movieitemdiv'>
            
              {movieitems.map((data , index)=>{
                
                
                return(
                 
                  <>
                  <div className='movieCardCont'>
              <img className='movieCardImg' src={data.img}/>
              <div
                className='movieCardRate'
              > <span >{data.name}</span>
                  <StarRate />
              </div>
              <span >{data.genre}</span><br/>
              <span>${data.price}</span> <button className='com' onClick={()=>addToCart(data.id)}>Buy Tickets</button>
              
              <Comment/>
            </div>
                  </>
                )
              
              })}
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