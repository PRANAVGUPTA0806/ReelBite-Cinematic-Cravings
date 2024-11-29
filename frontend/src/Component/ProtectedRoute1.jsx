import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import "./Loader.css";
import pp1 from '../Home/pics/pp1.png';
import axios from "axios";

const TextTyper = () => {
  const [typedText, setTypedText] = useState("");
  const text = "HAPPY WATCHING!!!";

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setTypedText(text.substring(0, i + 1));
      i++;
      if (i > text.length) {
        clearInterval(intervalId);
      }
    }, 100); // adjust the speed to your needs
  }, [text]);

  return <span>{typedText}</span>;
};

const ProtectedRoute1 = ({ element: Component }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("auth-token");

    if (storedToken) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setUserDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          localStorage.removeItem("auth-token");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="logo-container">
          <img
            src={pp1}
            alt="Company Logo"
          />
        </div>
        <div className="text-container">
          <TextTyper />
        </div>
      </div>
    );}

  // If userDetails is not set, redirect to login
  if (!userDetails) {
    return <Component />;
  }

  // Render the protected component if authenticated
  return <Navigate to="/home" state={{ from: location }} replace />;
};

export default ProtectedRoute1;