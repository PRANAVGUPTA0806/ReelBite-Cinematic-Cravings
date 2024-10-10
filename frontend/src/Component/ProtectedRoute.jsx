import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ element: Component }) => {
  const  token  = localStorage.getItem('auth-token');
  const location = useLocation();

  return token ? (
    <Component />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
