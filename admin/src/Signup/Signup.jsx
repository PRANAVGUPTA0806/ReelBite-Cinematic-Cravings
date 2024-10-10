import React, { useState } from 'react';
import './Signup.css';
import main from './pics2/main.jpg';
import { Link, useNavigate } from 'react-router-dom';
import eyeIcon from "../assets/eye.png"; 
import eyeSlashIcon from "../assets/eye-2.png";

function Signup() {
  const navigate = useNavigate();

  const [isLoginFormVisible, setLoginFormVisible] = useState(true);
  const [isLostPasswordFormVisible, setLostPasswordFormVisible] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [resetEmail, setResetEmail] = useState("");

  const changeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the password visibility
  };

  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
  };

  const login = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("Login function executed", formData);
    let responseData;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
        method: 'POST', 
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData),
      });

      responseData = await response.json();

      if (responseData.token && responseData.role === 'admin') {
        // if(responseData.role === 'user'){ // Check for successful login by token
        localStorage.setItem('auth-token', responseData.token);
        // }
        console.log("Login successful");
        alert("Welcome, Admin!");
        navigate('/admin/allorders');
       
  
      } else {
        console.log(responseData.error);
        alert("Login failed, please try again. " + responseData.error);
      }

    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  


  const requestPasswordReset = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/forgot-password`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        alert("Password reset link sent to your email.");
        navigate('/');
        setLostPasswordFormVisible(false);
      } else {
        alert("Failed to send password reset link. " + responseData.error);
      }
    } catch (error) {
      console.error("Error during password reset request:", error);
      alert("An error occurred while requesting password reset.");
    }
  };

  const toggleForm = (formType) => {
    setLoginFormVisible(formType === 'login');
    setLostPasswordFormVisible(formType === 'lostPassword');
  };

  return (
    <div className='zz'>
      <img className="bgimge" src={main} alt="pic" />
      <div className="login-page">
        <div className="box">
          <div className="form">
            <form 
              className={isLoginFormVisible ? 'login-form' : 'login-form form-hidden'} 
              onSubmit={login}
            >
              <h3>Log In</h3>
              <div className="form-group">
                <input 
                  name='email' 
                  value={formData.email} 
                  onChange={changeHandle} 
                  type="email" 
                  placeholder="Email Address*" 
                  className="form-control" 
                  required 
                />
              </div>
              <div className="form-group">
                <input 
                  name='password' 
                  value={formData.password} 
                  onChange={changeHandle} 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password*" 
                  className="form-control" 
                  required 
                />
                <button
              type="button"
              onClick={togglePasswordVisibility}
              className="togglePasswordButton15"
            >
              <img
                src={showPassword ? eyeSlashIcon : eyeIcon}
                alt={showPassword ? "Hide password" : "Show password"}
                width="24"
                height="24"
              />
            </button>
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" /> Remember Me
                </label>
              </div>
              <button type="submit" className="submit-btn">Login</button>
              <p>
                <a href="#" className="lost-pass-btn" onClick={() => toggleForm('lostPassword')}>Lost Your Password?</a>
              </p>
            </form>

            {/* Lost Password Form */}
            <form 
              className={isLostPasswordFormVisible ? 'lost-password-form' : 'lost-password-form form-hidden'} 
              onSubmit={requestPasswordReset}
            >
              <h3>Lost Your Password?</h3>
              <h5>You will receive a link to create a new password via email.</h5>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Email Address*" 
                  className="form-control" 
                  value={resetEmail} 
                  onChange={handleResetEmailChange} 
                  required 
                />
              </div>
              <button type="submit" className="submit-btn">Reset</button>
              <p>
                <Link to='/login' className="login-btn" onClick={() => toggleForm('login')}>Log in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
