import React, { useState } from 'react';
import './PasswordReset.css'
import { useParams, useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const { resetToken } = useParams(); // Extract resetToken from URL params
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/user/reset-password/${resetToken}`, {
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
              type="password" 
              id="password"
              required 
            />
          </div>
          <div className="control">
            <label htmlFor="password">Confirm New Password:</label>
            <input 
              name='password' 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password" 
              id="password" 
              required 
            />
          </div>
          <div className="control">
            <button type="submit" className="btn">Reset Password</button>
          </div>
          
        </form>
      </div>
    </section>
  );
};

export default PasswordReset;
