import React, { useEffect, useState } from 'react';
import '../MovieProduct/MovieProduct.css';
import removeicon from '../../assets/cross_icon.png'
import editicon from '../../assets/edit.png'
import restoreicon from '../../assets/restore.png'

const AllUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: '',
    username: '',
    email: '',
    isAdmin: false,
    userStatus: '', // Example: Active, Suspended, etc.
    imageUrl: '',
  });

  const fetchInfo = async () => {
    const token = localStorage.getItem('auth-token'); // Retrieve the token
    
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/all-users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Include token for authentication
      },
    })
    .then((res) => res.json())
    .then((data) => {
      setAllUsers(data);
    });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const editUser = (user) => {
    setIsEditing(true);
    setCurrentUser({ ...user });
  };

  const handleInputChange = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const saveUser = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/update-admin/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(currentUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const data = await response.json();
      setIsEditing(false);
      alert('User updated');
      fetchInfo(); // Refresh the user list after editing
    } catch (error) {
      setIsEditing(false);
      alert('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Do you really want to delete this user?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/delete-user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      alert('User marked as deleted');
      await fetchInfo(); // Refresh the list after deletion
    } catch (error) {
      alert('Error deleting user:', error);
    }
  };

  const handleRestore = async (userId) => {
    const confirmRestore = window.confirm('Do you want to restore this user?');
    if (!confirmRestore) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/restore-user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to restore user');
      }

      alert('User restored successfully');
      await fetchInfo(); // Refresh the list after restoring
    } catch (error) {
      alert('Error restoring user:', error);
    }
  };

  return (
    <div className='list-product'>
      <h1>All Users</h1>
      <div className="listproduct-format-main">
        <p>UserID</p>
        <p>Username</p>
        <p>Email</p>
        <p>Avatar</p>
        <p>isAdmin</p>
        <p>Status</p>
        <p>Edit</p>
        <p>UserDeleted</p>
        <p>Delete User/Restore User</p>
      </div>
      <div className="listproduct-allproducts">
      <hr />
        {allUsers.map((user, index) => {return <>
          <div key={index} className="listproduct-format-main listproduct-format">
            <p>{user._id}</p>
            <p>{user.username}</p>
            <p>{user.email}</p>
            <img src={user.imageUrl} alt="avatar" className="listproduct-product-icon" style={{ width: '40px', height: '40px' }} />
            <p>{user.isAdmin ? 'true' : 'false'}</p>
            <p>{user.userStatus}</p>
            <img onClick={() => editUser(user)} className='listproduct-remove-icon' src={editicon} alt="Edit" />
            <p>{user.isDeleted ? 'True' : 'False'}</p>
            {user.isDeleted ? (
              <img
                className='listproduct-remove-icon'
                src={restoreicon}
                alt="restore"
                onClick={() => handleRestore(user._id)}
                style={{ width: '20px', height: '20px' }} 
              />
            ) : (
              <img
                className='listproduct-remove-icon'
                src={removeicon}
                alt="delete"
                onClick={() => handleDelete(user._id)}
              />
            )}
            
          </div>
          <hr />
          </>
})}
     
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className='edit-product'>
          <h2>Edit User Details</h2>
          <label>Username:</label>
          <input type='text' name='username' value={currentUser.username} onChange={handleInputChange} />

          <label>Email:</label>
          <input type='email' name='email' value={currentUser.email} onChange={handleInputChange} />

          <label>isAdmin:</label>
          <input type='checkbox' name='isAdmin' checked={currentUser.isAdmin} onChange={() => setCurrentUser({ ...currentUser, isAdmin: !currentUser.isAdmin })} />

          <label>Status:</label>
          <input type='text' name='userStatus' value={currentUser.userStatus} onChange={handleInputChange} />

          <label>Avatar URL:</label>
          <input type='text' name='imageUrl' value={currentUser.imageUrl} onChange={handleInputChange} />

          <button onClick={saveUser}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AllUser;
