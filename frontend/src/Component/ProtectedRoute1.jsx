import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

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
    return <>
    <style>
      {`
        .loadf {
          background-color: #282929;
          max-width: 100vw;
          color: aliceblue;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          font-size: 1.5rem;
        }
      `}
    </style>
    <div className="loadf">Loading .......</div>
  </>// Show a loading state while checking authentication
  }

  // If userDetails is not set, redirect to login
  if (!userDetails) {
    return <Component />;
  }

  // Render the protected component if authenticated
  return <Navigate to="/home" state={{ from: location }} replace />;
};

export default ProtectedRoute1;
