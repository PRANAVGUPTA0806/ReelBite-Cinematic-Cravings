import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import StarRate from '../Component/StarRating/StarRate';
import Comment from '../Comments/Comment';
import blankproduct from "../assets/nop.png";
import './ProductDetails.css';

function Footer13444() {
  return (
    <footer className='rrrrr'>
      <div className="social-links333333">
        <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
        <a href="https://twitter.com/LOGIN"><i className="fab fa-twitter"></i></a>
        <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
        <a href="https://in.pinterest.com/"><i className="fab fa-pinterest"></i></a>
      </div>
      <span style={{ color: "white" }}>ReelBite: Cinematic Cravings Movies Page</span>
    </footer>
  );
}

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams(); // Extract productId from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantityAdd, setQuantityAdd] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});

  const handleClick = (product) => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      alert("Login/Signup first"); // Show the alert
      navigate("/login"); // Redirect to the login page
      return;
    }
    setLoadingStates((prevStates) => ({
      ...prevStates,
      [product.products_id]: true,
    }));

    setTimeout(() => {
      handleAddToCart(product._id);
      setLoadingStates((prevStates) => ({
        ...prevStates,
        [product.products_id]: false,
      }));
    }, 1000);
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    setQuantityAdd(false);
    const t = localStorage.getItem('auth-token');
    if (!t) {
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

      setQuantityAdd(true);
      alert('Movie added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add movie to cart:Login/Signup first');
    }
  };

  useEffect(() => {
    // Function to fetch product details from multiple endpoints
    const fetchProductDetails = async () => {
      const endpoints = [
        `${import.meta.env.VITE_BACKEND_URL}/api/moviesproducts/${productId}`,
        `${import.meta.env.VITE_BACKEND_URL}/api/foodproducts/${productId}`
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint);
          if (response.ok) {
            const data = await response.json();
            setProduct(data); // Set product if found
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error(`Error fetching from ${endpoint}:`, error);
        }
      }

      // If no product was found in any of the endpoints
      setLoading(false);
    };

    fetchProductDetails();
  }, [productId]);

  // Handle loading and blank state within the render logic
  return (
    <>
      <Navbar setSearchTerm="" quantityAdded={quantityAdd} />
      {loading ? (
        <div className='loadf'>Loading product details...</div>
      ) : !product ? (
        <div className="blankCartContainer21">
          <img src={blankproduct} alt="Empty cart" />
        </div>
      ) : (
        <div className="product-details">
          <div className="product-image">
            <img src={product.image} alt={product.productName} />
          </div>
          <div className="product-info">
            <h2>{product.productName}</h2>
            <p>Price: Rs. {product.productPrice}</p>
            {product.productDescription && (
              <p>Description: {product.productDescription}</p>
            )}
            <p>Category: {product.category ? product.category : "Food"}</p>
            <p>In Stock: {product.available ? "Yes" : "No"}</p>
            <div className="productPriceContainer">
              <StarRate userId={localStorage.getItem("id")} productId={product._id} productModel="allProducts"/>
            </div>
            <div className="productAddToCartButton">
              <button
                className={loadingStates[product._id] ? "button loading" : "button"}
                onClick={() => handleClick(product)}
                disabled={loadingStates[product._id]}
              >
                <span>Add to cart</span>
                <div className="cart">
                  <svg viewBox="0 0 36 26">
                    <polyline points="1 2.5 6 2.5 10 18.5 25.5 18.5 28.5 7.5 7.5 7.5"></polyline>
                    <polyline points="15 13.5 17 15.5 22 10.5"></polyline>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className='pc'>
            Reviews <br />
            <br />
            <Comment productId={product._id} />
          </div>
        </div>
      )}
      <Footer13444 />
    </>
  );
};

export default ProductDetails;
