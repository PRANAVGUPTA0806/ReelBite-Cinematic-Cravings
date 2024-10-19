import React, { useState ,useEffect} from 'react';
import './Signup.css';
import main from './pics2/main.jpg';
import { Link, useNavigate } from 'react-router-dom';
import eyeIcon from "../assets/eye.png"; 
import eyeSlashIcon from "../assets/eye-2.png";
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();

  const [isLoginFormVisible, setLoginFormVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLostPasswordFormVisible, setLostPasswordFormVisible] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the password visibility
  };
  const [resetEmail, setResetEmail] = useState("");

  const changeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
  };

  const signin1 = async (event) => {
    event.preventDefault();
    if (!usernameRegex.test(formData.username)) {
      toast.error("Username must be between 3-20 characters and can only contain letters, numbers, and underscores.");
      return;
    }

  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid email address.");
    return;
  }
    // Validate password
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 8 characters, include an uppercase, lowercase, number, and special character.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      setIsLoading(false);

      if (responseData._id) {
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('id', responseData._id);
        localStorage.setItem('avatar', responseData.imageUrl|| "https://res.cloudinary.com/dwprhpk9r/image/upload/v1728546051/uploads/product_1728546048771.png.png");
      
        toast.success("You are signed up... WELCOME TO ... !!");
        setTimeout(() => {
            navigate('/home');
          
        }, 2000);
      } else {
        setIsLoading(false);
        toast.error("Signup failed, please try again. " + responseData.error);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred during signup." + error);
     
      console.error("Error during signup:", error);
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
        
        toast.success('Password reset successfully. Redirecting to login...');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after a delay
        }, 1000);
      } else {
        toast.error(data.message || 'Error resetting password');

      }
    } catch (error) {
      setIsLoading(false);
      toast.error('An error occurred while resetting the password');
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
                  type= {showPassword ? "text" : "password"}
                  placeholder="Password*" 
                  className="form-control" 
                  required 
                />
                <button
              type="button"
              onClick={togglePasswordVisibility}
              className="togglePasswordButton"
            >
              <img
                src={showPassword ? eyeIcon : eyeSlashIcon}
                alt={showPassword ? "Hide password" : "Show password"}
                width="24"
                height="24"
              />
            </button>
              </div>
              
              {isLoading ? (
                  <PulseLoader color="#36d7b7" loading={isLoading} size={10} />
                ) : (
                  <button type="submit" className="submit-btn" disabled={isLoading}>
                  {isLoading ? (
                    <PulseLoader color="#fff" size={10} />
                  ) :
                    "Sign Up"
                  }
                </button>
                )}
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
