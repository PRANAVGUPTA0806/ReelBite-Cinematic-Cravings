import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);
  const [isLostPasswordFormVisible, setLostPasswordFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const changeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("Login function executed", formData);
    let responseData;

    try {
      const response = await fetch('http://localhost:8000/api/user/login', {
        method: 'POST', 
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData),
      });

      responseData = await response.json();

      if (responseData.token) { // Check for successful login by token
        localStorage.setItem('auth-token', responseData.token);
        console.log("Login successful");
        alert("You are logged in... WELCOME TO ... !!");
        navigate('/home');
      } else {
        console.log(responseData.error);
        alert("Login failed, please try again. " + responseData.error);
      }

    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  const toggleForm = (formType) => {
    setLoginFormVisible(formType === 'signin');
    setLostPasswordFormVisible(formType === 'lostPassword');
  };

  return (
    <section className='w2'>
      <div className="form-container">
        <h1>Login</h1>
        <form 
          className={isLoginFormVisible ? 'login-form' : 'login-form form-hidden'} 
          onSubmit={login}
        >
          <div className="control">
            <label htmlFor="email">Email</label>
            <input 
              name='email' 
              value={formData.email} 
              onChange={changeHandle} 
              type="email" 
              id="email" 
              required 
            />
          </div>
          <div className="control">
            <label htmlFor="password">Password</label>
            <input 
              name='password' 
              value={formData.password} 
              onChange={changeHandle} 
              type="password" 
              id="password" 
              required 
            />
          </div>
          <span><input type="checkbox" /> Remember me</span>
          <div className="control">
            <button type="submit" className="btn">Login</button>
          </div>
        </form>
        <p>
          <Link to='/sign' onClick={() => toggleForm('signin')}>Sign Up</Link> | 
          <a href="/sign#" onClick={() => toggleForm('lostPassword')}>Lost Your Password?</a>
        </p>
      </div>
    </section>
  );
}

export default Login;
