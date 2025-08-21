import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null); // Holds user data
  const [logoutReqLoading, setLogoutReqLoading] = useState(false);
  const [loading, setLoading] = useState(true); // Tracks loading status

  const handleLogout = async () => {
    setLogoutReqLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/logout`,
        {}, // <-- send an empty object as body
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 204) {
        // console.log("Logout successful:", response.data);
        // Optionally: clear localStorage or user context
        toast.success("Logged out successfully");
        setUser(null);
        navigate("/login");
      } else {
        console.warn("Unexpected logout response:", response);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Logout failed. Please try again.";
        console.error("Logout error:", message);
        toast.error(message); // Optional feedback
      } else {
        console.error("Unexpected error during logout:", error);
      }
    } finally {
      setLogoutReqLoading(false);
    }
  };

  // Optional: Auto-load user data on mount (e.g., for JWT session)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/user`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, handleLogout, logoutReqLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
