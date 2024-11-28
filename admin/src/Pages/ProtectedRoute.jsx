import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ element: Component }) => {
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
  </>// Show the protected component while loading
  }

  // Redirect to login if userDetails is null or the user is not an admin
  if (!userDetails) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render the protected component if authenticated and role is admin
  return <Component />;
};

export default ProtectedRoute;
