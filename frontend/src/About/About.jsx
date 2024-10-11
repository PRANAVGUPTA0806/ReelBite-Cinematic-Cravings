import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import './Exit1.css';
import movie1 from './pics3/123.mp4';
import garg1 from './pics3/garg1.jpg';
import mov from './pics3/mov.jpg';
import images from './pics3/images.jpg';
import download from './pics3/download.jpg';
import bg1 from '/pp1.png'

const Header1 = () => {
    return (
      <header className='byy'>
        <nav className="navbar">
          <div className="container5">
            <Link to='/home' className="navbar-brand" >ReelBite:Cinematic Cravings</Link>
            <div className="navbar-nav">
            {localStorage.getItem('auth-token')?<Link to='/home' style={{ textDecoration: "None" }}>Home</Link>
          :<Link  style={{ textDecoration: "None" }}   to='/'>Home</Link>}
              <Link className="bollywood"  style={{ textDecoration: "none", color:"#F4FEFC" }} to='/movies'>Movies</Link>
              <Link className="Food"  style={{ textDecoration: "none", color:"#F4FEFC" }} to='/food'>Food</Link>
              <Link  style={{ textDecoration: "none", color:"#F4FEFC" }} to='/contact'>Contact Us</Link>
            
              <Link to='/account' ><img src={localStorage.getItem('avatar')?localStorage.getItem('avatar'):"https://res.cloudinary.com/dwprhpk9r/image/upload/v1728546051/uploads/product_1728546048771.png.png"} alt="logo" className="nav-profile" /></Link> 
                   
                   
              {localStorage.getItem('auth-token')?<button  className="btn btn-full" id="btn1" onClick={()=>{localStorage.removeItem('auth-token');localStorage.removeItem('avatar');window.location.replace('/about')}}>Logout</button>
          :<Link  style={{ textDecoration: "None" }} id="btn1" className="btn btn-full" to='/login'>Log In</Link>}
            </div>
          </div>
        </nav>
        <div className="banner">
          <div className="container5">
            <h1 className="banner-title1">
              ABOUT
            </h1>
          </div>
        </div>
      </header>
    );
  }

function MainSection() {
  return (
    <section className="design2" id="design2">
      <div className="container5">
        <div className="title1">
          <h2>Bonjour!!</h2>
        </div>
        <div className="design2-content">
          <div className="design2-item">
            <div className="design2-img">
              <img src={download} alt="latastmov" />
            </div>
            <div className="design2-title1"></div>
          </div>
          <div className="design2-item">
            <p><h2></h2></p>
            <p><h1><b>"ReelBite's Aesthetic"</b></h1></p>
            <p><h2><b>ReelBite:</b></h2><i>The soul creativity or love put the essence of yourself that is put into your work.ReelBite is the world's most popular and authoritative source for movie, TV and celebrity content.This site also have exit-the-plugin feature. The site was created by Pranav Gupta .[7] It is operated by P's, Inc.</i></p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section className="blog1" id="blog1">
      <div className="container5">
        <div className="title1">
          <h2> It's Aesthetic:)</h2>
        </div>
        <div className="blog1-content">
          <div className="blog1-item">
            <div className="blog1-img">
              <img src={mov} alt="mov1" />
              <span><i className="far fa-heart"></i></span>
            </div>
            <div className="blog1-text">
              <span>15 Mar, 2024</span>
              <h2 className="hey1">Aesthetic Wallpapers</h2>
              <p><b>One Mile At A Time</b></p>
              <p>Read More..</p>
            </div>
          </div>
          <div className="blog1-item">
            <div className="blog1-img">
              <img src={garg1} alt="mov2" />
              <span><i className="far fa-heart"></i></span>
            </div>
            <div className="blog1-text">
              <span>22 March, 2024</span>
              <h2 className="hey1">Love Lies Bleeding</h2>
              <p><b>Aesthetic Photography</b></p>
              <p>Read More..</p>
            </div>
          </div>
          <div className="blog1-item">
            <div className="blog1-img">
              <img src={images} alt="mov3" />
              <span><i className="far fa-heart"></i></span>
            </div>
            <div className="blog1-text">
              <span>24 May, 2024</span>
              <h2 className="hey1">Aesthetic Photography</h2>
              <p><b>The Unplanned Place</b></p>
              <p>Read More..</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="social-links2">
        <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
        <a href="https://twitter.com/LOGIN"><i className="fab fa-twitter"></i></a>
        <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
        <a href="https://in.pinterest.com/"><i className="fab fa-pinterest"></i></a>
      </div>
      <span style={{ color: "white" }}>ReelBite: Cinematic Cravings About Page</span>
    </footer>
  );
}


const About = () => {
  const [exitIntent, setExitIntent] = useState(false);

  useEffect(() => {
    const handleMouseLeave = () => {
      setExitIntent(true);
    };

    const handleMouseOut = (event) => {
      if (event.clientY < 0 && exitIntent) {
        document.getElementById('exit-popup5').style.display = 'block';
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
    document.getElementById('exit-popup5').style.display = 'none';
  };

  return (
      <div className="App">
      <Header1 />
      <MainSection />
      <BlogSection />
      <Footer />
      <div id="exit-popup5" style={{ display: 'none' }} >
        <h2>Tusi Jare ho??</h2>
        <h2>Tusi Na Jao Naaa!!!</h2>
        <h4>Get Exciting Offers Ahead!!!</h4>
        <h2>Watch Trailer</h2>
        <video width="300" height="300" controls>
          <source src={movie1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <br />
        <button id='continue-button'onClick={handleClosePopup}>Continue</button>
      </div>
    </div>
  );
};

export default About;
