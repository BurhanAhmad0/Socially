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

  // If authenticated, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
