import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
  } from "react";
  import { useNavigate } from "react-router-dom";
  
  const UserContext = createContext();
  
  export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(() => {
      const savedUserName = localStorage.getItem("userName");
      return savedUserName || "";
    });
  
    const [token, setToken] = useState(() => {
      const savedToken = localStorage.getItem("token");
      return savedToken || "";
    });
  
    const navigate = useNavigate();
    const logoutTime = 1800000; // 30 minutes in milliseconds
  
    useEffect(() => {
      // Store userName and token in localStorage whenever they change
      if (userName) {
        localStorage.setItem("userName", userName);
      } else {
        localStorage.removeItem("userName");
      }
  
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    }, [userName, token]);
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const logout = useCallback(() => {
      setUserName("");
      setToken("");
      localStorage.clear(); // Clear all local storage
      navigate("/login"); // Redirect to login page after logout
    });
  
    useEffect(() => {
      if (!token) return;
  
      const handleLogout = () => {
        logout();
        alert("You have been logged out due to inactivity.");
      };
  
      // Set the timeout for auto logout
      const logoutTimer = setTimeout(handleLogout, logoutTime);
  
      // Reset the timer if the user interacts (e.g., clicks or types)
      const resetTimer = () => {
        clearTimeout(logoutTimer);
        setTimeout(handleLogout, logoutTime);
      };
  
      // Add event listeners for user interactions
      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);
  
      // Cleanup function to remove event listeners on unmount
      return () => {
        clearTimeout(logoutTimer);
        window.removeEventListener("mousemove", resetTimer);
        window.removeEventListener("keydown", resetTimer);
      };
    }, [token, navigate, logout]);
  
    return (
      <UserContext.Provider
        value={{ userName, token, setUserName, setToken, logout }}
      >
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useUser = () => useContext(UserContext);
  