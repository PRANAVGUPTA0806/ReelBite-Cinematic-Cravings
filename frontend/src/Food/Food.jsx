import React, { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import './Food.css'
import Navbar1 from '../Component/Navbar1/Navbar1';
import movie from './pics6/make.jpg'
import './Exit49.css'
import { fooditems } from '../Data';
import Comment from '../Comments/Comment'
import StarRate from '../Component/StarRating/StarRate';
import { MovieContext } from '../Context/MovieContext';

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
const Movies = ()=>{
  const {addToFoodCart, CartItems} = useContext(MovieContext)

    const [exitIntent, setExitIntent] = useState(false);

  useEffect(() => {
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

    return(
        <>
        <div className='wrapper'>
            <Navbar1/>
            <div className='movieContainer'>
          <div className='movieitemdiv'>
            
              {fooditems.map((data)=>{
                return(
                  <>
                  <div className='movieCardCont'>
              <img className='movieCardImg' src={data.img}/>
              <div
                className='movieCardRate'
              > <span >{data.name}</span>
                  <StarRate/>
              </div>
              <span >${data.price}</span> <button className='com' onClick={()=>addToFoodCart(data.id)}>Buy Item</button>
              <Comment/>
            </div>
                  </>
                )
              })}
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
        </>
    )
}

export default Movies