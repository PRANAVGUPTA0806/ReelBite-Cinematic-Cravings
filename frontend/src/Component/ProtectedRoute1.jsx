import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { useUser } from "../context/UserContext";

const ProtectedRoute1 = ({ element: Component }) => {
  const  token  = localStorage.getItem('auth-token');
  const location = useLocation();
  const isAuthenticated = !token;

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/home" state={{ from: location }} replace />
  );
};

export default ProtectedRoute1;
