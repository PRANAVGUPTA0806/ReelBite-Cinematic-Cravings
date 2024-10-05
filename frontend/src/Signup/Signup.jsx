import React, { useState } from 'react';
import './Signup.css';
import main from './pics2/main.jpg';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const [isLoginFormVisible, setLoginFormVisible] = useState(true);
  const [isLostPasswordFormVisible, setLostPasswordFormVisible] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [resetEmail, setResetEmail] = useState("");

  const changeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
  };

  const signin1 = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/user/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData._id) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('id', responseData._id);
        alert("You are signed up... WELCOME TO ... !!");
        navigate('/home');
      } else {
        alert("Signup failed, please try again. " + responseData.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup.");
    }
  };

  const requestPasswordReset = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/user/forgot-password', {
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
        navigate('/login');
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
              onSubmit={signin1}
            >
              <h3>Sign Up</h3>
              <div className="form-group">
                <input 
                  name='username' 
                  value={formData.username}
                  onChange={changeHandle} 
                  type="text" 
                  placeholder="Name*" 
                  className="form-control" 
                  required 
                />
              </div>
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
                  type="password" 
                  placeholder="Password*" 
                  className="form-control" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" /> Remember Me
                </label>
              </div>
              <button type="submit" className="submit-btn">Sign Up</button>
              <p>
                <Link to='/login' className="register-btn" onClick={() => toggleForm('login')}>Log in</Link> | 
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
