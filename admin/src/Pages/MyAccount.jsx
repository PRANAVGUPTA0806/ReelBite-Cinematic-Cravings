import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyAccount.module.css";
import Navbar from '../Components/Navbar/Navbar'
import { ToastContainer, toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css";


function Footer1343() {
    return (
      <footer className='rrrr'>
        <div className="social-links33">
          <a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
          <a href="https://twitter.com/LOGIN"><i className="fab fa-twitter"></i></a>
          <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i></a>
          <a href="https://in.pinterest.com/"><i className="fab fa-pinterest"></i></a>
        </div>
        <span style={{ color: "white" }}>ReelBite: Cinematic Cravings Food Page</span>
      </footer>
    );
  }
function MyAccount() {
    const[quantityAdd,setQuantityAdd] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    avatar: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for avatar upload
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    const storedToken = localStorage.getItem("auth-token");
    if (storedToken) {
      setToken(storedToken);
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUserDetails({
            username: response.data.username,
            email: response.data.email,
            avatar: response.data.imageUrl || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Password validation (dynamically as user types)
    if (name === "password") {
      setUserDetails({
        ...userDetails,
        [name]: value,
      });

      if (value.length === 0) {
        setErrors({ ...errors, password: "" }); // Clear error when empty
      } else if (value.length < 8) {
        setErrors({ ...errors, password: "Password is too short. It should be at least 8 characters long." });
      } else if (!/[!@#$%^&*]/.test(value)) {
        setErrors({ ...errors, password: "Password must contain at least one special character." });
      } else if (!/\d/.test(value)) {
        setErrors({ ...errors, password: "Password must contain at least one digit." });
      } else {
        setErrors({ ...errors, password: "" }); // Clear error when valid
      }
    }
  };

  const handleSave = () => {
    if (token) {
      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
          {
            username: userDetails.username,
            email: userDetails.email,
            avatar: userDetails.avatar,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          setEditMode(false);
          toast.success("Profile updated successfully!"); // Success message
          localStorage.setItem("avatar", response.data.imageUrl);
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          toast.error("Error updating profile."); // Error message
        });
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadAvatar = async () => {
    if (selectedFile) {
      setLoading(true); // Start loader
      const formData = new FormData();
      formData.append("product", selectedFile);
      const token = localStorage.getItem('auth-token'); // Retrieve the token
    
        if (!token) {
            console.error('No token found in localStorage');
            return;
        }
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/upload/image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          avatar: response.data.image_url,
        }));
        toast.success("Avatar uploaded successfully!"); // Success message
      } catch (error) {
        console.error("Error uploading avatar:", error);
        toast.error("Error uploading avatar.");  // Error message
      } finally {
        setLoading(false); // Stop loader
      }
    }
  };

  return (
    <>
    <Navbar />
    <div className={styles.myAccountContainer}>
      <h2>My Account</h2>
      <div className={styles.profileDetails}>
        <label>Name:</label>
        {editMode ? (
          <input
            type="text"
            name="username"
            value={userDetails.username}
            onChange={handleInputChange}
          />
        ) : (
          <span>{userDetails.username}</span>
        )}
      </div>
      <div className={styles.profileDetails}>
        <label>Email:</label>
        {editMode ? (
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
          />
        ) : (
          <span>{userDetails.email}</span>
        )}
      </div>
      
      <div className={styles.actions}>
        {editMode ? (
          <button onClick={handleSave} className={styles.saveButton}>
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className={styles.editButton}
          >
            Edit Profile
          </button>
        )}
      </div>
      <div className={styles.avatarContainer}>
        <img
          src={
            userDetails.avatar ||
            "https://res.cloudinary.com/dwprhpk9r/image/upload/v1728546051/uploads/product_1728546048771.png.png"
          }
          alt="User Avatar"
          className={styles.avatar}
        />
        {editMode && (
          <>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUploadAvatar} className={styles.uploadButton} disabled={loading}>
              {loading ? "Uploading..." : "Set Avatar"}
            </button>
          </>
        )}
      </div>
    </div>
    <Footer1343/>
    <ToastContainer/>
    </>
  );
}

export default MyAccount;
