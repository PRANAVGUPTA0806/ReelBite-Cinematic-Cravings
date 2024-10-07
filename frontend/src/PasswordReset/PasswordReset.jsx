import React, { useState } from 'react';
import './PasswordReset.css'
import { useParams, useNavigate } from 'react-router-dom';
import eyeIcon from "../assets/eye.png"; 
import eyeSlashIcon from "../assets/eye-2.png";
import eyeIcon1 from "../assets/eye1.png"; 
import eyeSlashIcon1 from "../assets/eye-21.png";

const PasswordReset = () => {
  const { resetToken } = useParams(); // Extract resetToken from URL params
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle the password visibility
  };
  const [showPassword1, setShowPassword1] = useState(false);
  const togglePasswordVisibility1= () => {
    setShowPassword1((prev) => !prev); // Toggle the password visibility
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(`https://reelbitecinematiccravings1.onrender.com/api/user/reset-password/${resetToken}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Password reset successfully. Redirecting to login...');

        alert(JSON.stringify({successMessage}));
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after a delay
        }, 1000);
      } else {
        setErrorMessage(data.message || 'Error resetting password');
        alert(JSON.stringify(({errorMessage})));

      }
    } catch (error) {
      setErrorMessage('An error occurred while resetting the password');
      alert(JSON.stringify(({errorMessage})));

    }
  };

  return (
    <section className='w44'>
      <div className="form-container344">
        <h1>Reset Your Password</h1>
        <form 
          className={'login-form'} 
           onSubmit={handlePasswordReset}
        >
          <div className="control3333">
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
              className="togglePasswordButton55"
            >
              <img
                src={showPassword ? eyeSlashIcon : eyeIcon}
                alt={showPassword ? "Hide password" : "Show password"}
                width="24"
                height="24"
              />
            </button>
          </div>
          <div className="control3333">
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
              className="togglePasswordButton565"
            >
              <img
                src={showPassword1 ? eyeSlashIcon1 : eyeIcon1}
                alt={showPassword1 ? "Hide password" : "Show password"}
                width="24"
                height="24"
              />
            </button>
          </div>
          <div className="control3333">
            <button type="submit" className="btn333">Reset Password</button>
          </div>
          
        </form>
      </div>
    </section>
  );
};

export default PasswordReset;
