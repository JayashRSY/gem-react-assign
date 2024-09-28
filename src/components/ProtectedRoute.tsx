// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();

  // If the user is not authenticated, navigate to the login page
  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, allow access to the requested component
  return <>{children}</>;
};

export default ProtectedRoute;
