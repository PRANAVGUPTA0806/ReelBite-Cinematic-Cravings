import React, { useState } from 'react';
import './PasswordReset.css'
import { useParams, useNavigate } from 'react-router-dom';
import eyeIcon from "../assets/eye.png"; 
import eyeSlashIcon from "../assets/eye-2.png";
import eyeIcon1 from "../assets/eye1.png"; 
import eyeSlashIcon1 from "../assets/eye-21.png";
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";

const PasswordReset = () => {
  const { resetToken } = useParams(); // Extract resetToken from URL params
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the password visibility
  };
  const [showPassword1, setShowPassword1] = useState(false);
  const togglePasswordVisibility1= () => {
    setShowPassword1((prev) => !prev); // Toggle the password visibility
  };
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!passwordRegex.test(newPassword)) {
      toast.error("Password must be at least 8 characters, include an uppercase, lowercase, number, and special character.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/reset-password/${resetToken}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      setIsLoading(false);
      if (data.success) {
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

  return (
    <section className='w2'>
      <div className="form-container">
        <h1>Reset Your Password</h1>
        <form 
          className={'login-form'} 
           onSubmit={handlePasswordReset}
        >
          <div className="control">
            <label htmlFor="email">New Password:</label>
            <input 
              name='password' 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)}
              type={showPassword ? "text" : "password"} 
              id="password"
              required 
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="togglePasswordButton14"
            >
              <img
                src={showPassword ? eyeIcon:eyeSlashIcon }
                alt={showPassword ? "Hide password" : "Show password"}
                width="24"
                height="24"
              />
            </button>
          </div>
          <div className="control">
            <label htmlFor="password">Confirm New Password:</label>
            <input 
              name='password' 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showPassword1 ? "text" : "password"}
              id="password" 
              required 
            />
            <button
              type="button"
              onClick={togglePasswordVisibility1}
              className="togglePasswordButton1"
            >
              <img
                src={showPassword1 ? eyeIcon1:eyeSlashIcon1 }
                alt={showPassword1 ? "Hide password" : "Show password"}
                width="24"
                height="24"
              />
            </button>
          </div>
          <div className="control">
          {isLoading ? (
                  <PulseLoader color="#36d7b7" loading={isLoading} size={10} />
                ) : (
                  <button type="submit" className="btn" disabled={isLoading}>
                  {isLoading ? (
                    <PulseLoader color="#fff" size={10} />
                  ) :
                    "Reset Password"
                  }
                </button>
                )}
          </div>
          
        </form>
      </div>
      
      <ToastContainer />
    </section>
  );
};

export default PasswordReset;
