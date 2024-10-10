import React ,{useState}from "react";
import "./ErrorPage.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar";


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
function ErrorPage() {
    const[quantityAdd,setQuantityAdd] = useState(false);
  
  return (
    <>
     <Navbar quantityAdded = {quantityAdd}/>
    <div class="errorPageMainContainer">
      <div className="errorMsgContent">
        <h2 class="error">404</h2>
        <p>PAGE NOT FOUND</p>
        <p>It looks like nothing was found at this location.</p>
      </div>
      <div className="errorBackToHomeBtn">
        <Link to="/">
          <button>BACK TO HOME</button>
        </Link>
      </div>
    </div>
    <Footer1343/>
    </>
  );
}

export default ErrorPage;
