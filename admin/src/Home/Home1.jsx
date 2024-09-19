import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import './Exit.css';
import pp1 from './pics/pp1.png';
import movie from './pics/movie.mp4';


function Header() {

  return (
    <header className='q1'>
      <div className="navigationBar">
        <div className="container">
          <Link to='/'><img src={pp1} alt="logoimg" width="50" height="50" /></Link>
        </div>
        <ul className="nav-list">
          <li><Link  style={{ textDecoration: "None" }} id="btn1" className="btn btn-full" to='/login'>Log In</Link></li>
        </ul>
      </div>
      <div className="main-content-header1">
        <h1>DO YOU WANT TO <br /><span className="color">EXPLORE SOMETHING ?</span><br /></h1>
      </div>
    </header>
  );
}




function Footer1() {
  return (
    <footer>
      <div className="social-links">
        <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
        <a href="https://twitter.com/LOGIN"><i className="fab fa-twitter"></i></a>
        <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
        <a href="https://in.pinterest.com/"><i className="fab fa-pinterest"></i></a>
      </div>
      <span style={{ color: "white" }}>ReelBite: Cinematic Cravings Home Page</span>
    </footer>
  );
}


const Home1 = () => {
  const [exitIntent, setExitIntent] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('auth-token'); 

    if (isLoggedIn) {
      navigate('/home');
    }

    const handleMouseLeave = () => {
      setExitIntent(true);
    };

    const handleMouseOut = (event) => {
      if (event.clientY < 0 && exitIntent) {
        document.getElementById('exit-popup').style.display = 'block';
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [exitIntent,navigate]);

  const handleClosePopup = () => {
    document.getElementById('exit-popup').style.display = 'none';
  };

  return (
      <div className="App">
      <Header/>
      <Footer1 />
      <div id="exit-popup" style={{ display: 'none' }} >
        <h2>Tusi Jare ho??</h2>
        <h2>Tusi Na Jao Naaa!!!</h2>
        <h4>Get Exciting Offers Ahead!!!</h4>
        <h2>Watch Trailer</h2>
        <video width="300" height="300" controls>
          <source src={movie} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <br />
        <button id='continue-button'onClick={handleClosePopup}>Continue</button>
      </div>
    </div>
  );
};

export default Home1;
