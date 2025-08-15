import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";
import LoaderComponent from "../Components/LoaderComponent.jsx";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // While checking auth status
  if (loading) {
    return <LoaderComponent />;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
