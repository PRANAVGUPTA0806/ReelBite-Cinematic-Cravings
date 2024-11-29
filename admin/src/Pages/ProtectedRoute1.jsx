import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Loader.css";
import pp1 from '../Home/pics/pp1.png';

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
          if (response.data.role === "admin") {
            setUserDetails(response.data);
          } else {
            console.warn("Unauthorized: User is not an admin.");
            localStorage.removeItem("auth-token");
          }
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
    );
  }

  // Redirect to login if userDetails is null or the user is not an admin
  if (!userDetails) {
    return <Component /> ;
  }

  // Render the protected component if authenticated and role is admin
  return <Navigate to="/home" state={{ from: location }} replace />;
};

export default ProtectedRoute1;

