import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import './Exit.css';
import kung from './pics/kung.avif';
import make from './pics/make.jpg';
import love from './pics/download.jpg';
import garfiel from './pics/garfiel.avif';
import reas from './pics/13.jpg';
import food from './pics/OIP (1).jpg';
import food1 from './pics/OIP.jpg';
import pp1 from './pics/pp1.png';
import image91 from './pics/image91.jpg';
import movie from './pics/movie.mp4';


function Header() {

  return (
    <header className='q1'>
      <div className="navigationBar">
        <div className="container">
          <Link to='/home'><img className='aaa' src={pp1} alt="logoimg" width="50" height="50" /></Link>
        </div>
        <ul className="nav-list">
          <li><Link className="bollywood" to='/admin/allorders' style={{ textDecoration: "None" }}>DashBoard</Link></li>
          {localStorage.getItem('auth-token')?<button  id="btn1" onClick={()=>{localStorage.removeItem('auth-token');localStorage.removeItem('avatar');window.location.replace('/')}}>Logout</button>
          :<Link  style={{ textDecoration: "None" }} id="btn1" className="btn btn-full" to='/login'>Log In</Link>}
          </ul>
      </div>
      <div className="main-content-header1">
        <h1>DO YOU WANT TO <br /><span className="color">EXPLORE SOMETHING ?</span><br /></h1>
       </div>
    </header>
  );
}

function MainSection1() {
  return (
    <section className="design" id="design">
      <div className="container">
        <div className="title">
          <h2>Today's News</h2>
        </div>
        <div className="design-content">
          <div className="design-item">
            <div className="design-img">
              <img  className='aaa' src={reas} alt="latastmov" />
            </div>
            <div className="design-title"></div>
          </div>
          <div className="design-item">
            <p><h2></h2></p>
            <p><h1><b>"Blockbuster Movie"</b></h1></p>
            <p><h2><b>13 Reasons Why:</b></h2><i>It is an American teen drama television series developed for Netflix by Brian Yorkey and based on the 2007 novel Thirteen Reasons Why by author Jay Asher. The series revolves around high school student Clay Jensen and the aftermath of the suicide of fellow student Hannah Baker. Before her death, she leaves behind a box of cassette tapes in which she details the reasons why she chose to kill herself as well as the people.</i></p>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogSection2() {
  return (
    <section className="blog" id="blog">
      <div className="container">
        <div className="title">
          <h2> Upcoming Movies:)</h2>
        </div>
        <div className="blog-content">
          <div className="blog-item">
            <div className="blog-img">
              <img  className='aaa'src={kung} alt="mov1" />
              <span><i className="far fa-heart"></i></span>
            </div>
            <div className="blog-text">
              <br />
              <span>15 Mar, 2024</span>
              <h2 className="hey">Kung Fu Panda 4</h2>
              <p><b>The Unplanned Place</b></p>
              <p>Read More..</p>
            </div>
          </div>
          <div className="blog-item">
            <div className="blog-img">
              <img className='aaa' src={love} alt="mov2" />
              <span><i className="far fa-heart"></i></span>
            </div>
            <div className="blog-text">
              <span>22 March, 2024</span>
              <h2 className="hey">Love Lies Bleeding</h2>
              <p><b>The Unplanned Place</b></p>
              <p>Read More..</p>
            </div>
          </div>
          <div className="blog-item">
            <div className="blog-img">
              <img  className='aaa' src={garfiel} alt="mov3" />
              <span><i className="far fa-heart"></i></span>
            </div>
            <div className="blog-text">
              <span>24 May, 2024</span>
              <h2 className="hey">Garfield</h2>
              <p><b>The Unplanned Place</b></p>
              <p>Read More..</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogSection1() {
  return (
    <section className="blog" id="blog">
      <div className="container">
        <div className="title">
          <h2>Best Selling Deals:)</h2>
        </div>
        <div className="blog-content">
          <div className="blog-item">
            <div className="blog-img">
              <img className='aaa' src={food1} alt="food1" />
              <span><i className="far fa-heart"></i></span>
            </div>
            <div className="blog-text">
              <br />
              <span>30 April, 2021</span>
              <h2 className="hey">Pizza Love</h2>
              <p><b>One Mile At A Time</b></p>
              <p>Read More..</p>
            </div>
          </div>
          <div className="blog-item">
            <div className="blog-img">
              <img className='aaa' src={food} alt="food2" />
              <span><i className="far fa-heart"></i></span>
            </div>
            <div className="blog-text">
              <span>6 March, 2021</span>
              <h2 className="hey">Wrap Love</h2>
              <p><b>The Unplanned Place</b></p>
              <p>Read More..</p>
            </div>
          </div>
          <div className="blog-item">
            <div className="blog-img">
              <img className='aaa' src={make} alt="food3" />
              <span><i className="far fa-heart"></i></span>
            </div>
            <div className="blog-text">
              <span>2 May, 2021</span>
              <h2 className="hey">Combo Love</h2>
              <p><b>The Unplanned Place</b></p>
              <p>Read More..</p>
            </div>
          </div>
        </div>
      </div>
    </section>
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


const Home = () => {
  const [exitIntent, setExitIntent] = useState(false);

  useEffect(() => {
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
  }, [exitIntent]);

  const handleClosePopup = () => {
    document.getElementById('exit-popup').style.display = 'none';
  };

  return (
      <div className="App">
      <Header/>
      <MainSection1/>
      <BlogSection2/>
      <BlogSection1/>
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

export default Home;
