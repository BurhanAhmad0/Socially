import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";
import { LuLoaderPinwheel } from "react-icons/lu";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // While checking auth status
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LuLoaderPinwheel size={48} className="animate-spin" />
      </div>
    );
  }

  // If authenticated, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
