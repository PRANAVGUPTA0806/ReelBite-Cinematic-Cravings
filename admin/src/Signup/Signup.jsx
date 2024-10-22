import React, { useState,useEffect } from 'react';
import './Signup.css';
import main from './pics2/main.jpg';
import { Link, useNavigate } from 'react-router-dom';
import eyeIcon from "../assets/eye.png"; 
import eyeSlashIcon from "../assets/eye-2.png";
import Cookies from "js-cookie"; 
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();

  const [isLoginFormVisible, setLoginFormVisible] = useState(true);
  const [isLostPasswordFormVisible, setLostPasswordFormVisible] = useState(false);

  
  const [resetEmail, setResetEmail] = useState("");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    email: email,
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); 
  const changeHandle = (e) => {
    const { name, value } = e.target;

  if (name === 'email') {
    setEmail(value); // Only update the email state if the input name is "email"
  }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the password visibility
  };

  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
  };
  useEffect(() => {
    // Check if the user email is stored in cookies when the component mounts
    const savedEmail = Cookies.get("email");
    // const savedpass = Cookies.get("password");
    if (savedEmail ) {
      setEmail(savedEmail); // Auto-fill the email field
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: savedEmail, // Correctly update the 'email' field in formData
      }))
      setRememberMe(true); // Set Remember Me to true
    }
  }, []);

  const login = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    console.log("Login function executed", formData);
    let responseData;

    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
        method: 'POST', 
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData,rememberMe),
      });

      responseData = await response.json();
      setIsLoading(false);

      if (responseData.token && responseData.role === 'admin') {
        // if(responseData.role === 'user'){ // Check for successful login by token
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem("role",responseData.role );
        localStorage.setItem('avatar', responseData.imageUrl|| "https://res.cloudinary.com/dwprhpk9r/image/upload/v1728546051/uploads/product_1728546048771.png.png"
        );
        if (rememberMe) {
          Cookies.set("email", email, { expires: 7 }); // Store the email in cookies for 7 days
          // Cookies.set("password", password, { expires: 7 });
        } else {
          Cookies.remove("email"); // Remove the email from cookies if not remembering
          // Cookies.remove("password");
        }
        // }
        console.log("Login successful");
        toast.success("Welcome, Admin!")
        setTimeout(() => {
          navigate('/admin/allorders');
        
      }, 2000);
        
       
  
      } else {
        setIsLoading(false);
        console.log(responseData.error);
        toast.error("Login failed, please try again. " + responseData.error);
      }

    } catch (error) {
      setIsLoading(false);
      console.error("Error during login:", error);
      toast.error("An error occurred during login.");
    }
  };

  


  const requestPasswordReset = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/forgot-password`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      const responseData = await response.json();
      setIsLoading(false);
      if (responseData.success) {
        toast.success("Password reset link sent!");
        setTimeout(() => {
          
          navigate('/');
        setLostPasswordFormVisible(false);
      }, 2000);
      } else {
        setIsLoading(false);
        toast.error("Failed to send password reset link. " + responseData.message);
      }
    } catch (error) {
      console.error("Error during password reset request:", error);
      setIsLoading(false);
       toast.error("An error occurred while requesting password reset.");
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
                  value={email} 
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
                src={showPassword ?eyeIcon: eyeSlashIcon }
                alt={showPassword ? "Hide password" : "Show password"}
                width="24"
                height="24"
              />
            </button>
              </div>
              <div className="form-group">
                <label>
                  <input type="checkbox" checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}/> Remember Me
                </label>
              </div>
              {isLoading ? (
                  <PulseLoader color="#36d7b7" loading={isLoading} size={10} />
                ) : (
                  <button type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? (
                    <PulseLoader color="#fff" size={10} />
                  ) :
                    "Login"
                  }
                </button>
                )}
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
              {isLoading ? (
                  <PulseLoader color="#36d7b7" loading={isLoading} size={10} />
                ) : (
                  <button type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? (
                    <PulseLoader color="#fff" size={10} />
                  ) :
                    "Reset"
                  }
                </button>
                )}
              <p>
                <Link to='/login' className="login-btn" onClick={() => toggleForm('login')}>Log in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
