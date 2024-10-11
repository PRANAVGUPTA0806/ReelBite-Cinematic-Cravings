import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import eyeIcon from "../assets/eye.png"; 
import eyeSlashIcon from "../assets/eye-2.png";

const Login = () => {
  const navigate = useNavigate();
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);
  const [isLostPasswordFormVisible, setLostPasswordFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the password visibility
  };
  const changeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
  };

  const login = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
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

      if (responseData.token) {
        
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('id', responseData._id);
        localStorage.setItem('avatar', responseData.imageUrl|| "https://res.cloudinary.com/dwprhpk9r/image/upload/v1728546051/uploads/product_1728546048771.png.png"),
        console.log("Login successful");
        if (responseData.role === 'admin') {
          console.log("Admin login successful");
          alert("Welcome, Admin!");
          navigate('/home');
        } else {
          console.log("User login successful");
          alert("You are logged in... WELCOME TO ... !!");
          navigate('/home');
        }
  
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
        navigate('/sign');
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
    <div className='w2'>
      <div className="login-page1">
      <div className="box1">
      <div className="form1">
        
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
              type={showPassword ? "text" : "password"}
              id="password" 
              required 
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="togglePasswordButton1"
            >
              <img
                src={showPassword ? eyeSlashIcon : eyeIcon}
                alt={showPassword ? "Hide password" : "Show password"}
                width="24"
                height="24"
              />
            </button>
          </div>
          <span><input type="checkbox" /> Remember me</span>
          <div className="control">
            <button type="submit" className="btn">Login</button>
          
        </div>
        <p>
          <Link to='/sign' onClick={() => toggleForm('login')}>Sign Up</Link> | 
          <a href="#" onClick={() => toggleForm('lostPassword')}>Lost Your Password?</a>
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

export default Login;
