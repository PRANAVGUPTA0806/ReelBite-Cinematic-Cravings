import React, { useState,useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import eyeIcon from "../assets/eye.png"; 
import eyeSlashIcon from "../assets/eye-2.png";
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie"; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLostPasswordFormVisible, setLostPasswordFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: email,
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the password visibility
  };
  const changeHandle = (e) => {
    
    const { name, value } = e.target;

  if (name === 'email') {
    setEmail(value); // Only update the email state if the input name is "email"
  }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [rememberMe, setRememberMe] = useState(false);

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
    let responseData;

    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
        method: 'POST', 
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData),
      });

      responseData = await response.json();
      setIsLoading(false);
      if (responseData.token) {
        
        localStorage.setItem('auth-token', responseData.token);
        localStorage.setItem('id', responseData._id);
        localStorage.setItem('avatar', responseData.imageUrl|| "https://res.cloudinary.com/dwprhpk9r/image/upload/v1728546051/uploads/product_1728546048771.png.png");
        if (rememberMe) {
          Cookies.set("email", email, { expires: 7 }); // Store the email in cookies for 7 days
          // Cookies.set("password", password, { expires: 7 });
        } else {
          Cookies.remove("email"); // Remove the email from cookies if not remembering
          // Cookies.remove("password");
        }
        console.log("Login successful");
        toast.success("You are logged in... WELCOME TO ... !!");
        setTimeout(() => {
          if (responseData.role === 'admin') {
            console.log("Admin login successful");
            navigate('/home');
          } else {
            console.log("User login successful");
            navigate('/home');
          }
        }, 2000);
        
  
      } else {
        console.log(responseData.error);
        toast.error("Login failed, please try again. " + responseData.error);
      }

    } catch (error) {
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
          
          navigate('/sign');
        setLostPasswordFormVisible(false);
      }, 2000);
        
      } else {
        setIsLoading(false);
        toast.error("Failed to send password reset link. " + responseData.message);
      }
    } catch (error) {
      setIsLoading(false);
       toast.error("An error occurred while requesting password reset.");
      
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
              value={email} 
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
                src={showPassword ? eyeIcon:eyeSlashIcon }
                alt={showPassword ? "Hide password" : "Show password"}
                width="24"
                height="24"
              />
            </button>
          </div>
          <span style={{ color: "white" }}><input type="checkbox" checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)} /> Remember me</span>
          <div className="control">
          {isLoading ? (
                  <PulseLoader color="#36d7b7" loading={isLoading} size={10} />
                ) : (
                  <button type="submit" className="btn" disabled={isLoading}>
                  {isLoading ? (
                    <PulseLoader color="#fff" size={10} />
                  ) :
                    "Login"
                  }
                </button>
                )}
          
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

export default Login;
