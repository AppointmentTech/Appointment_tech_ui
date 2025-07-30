import React, { useContext } from "react";
import { AuthContext } from "../ContextOrRedux/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { navigationUtils } from "./NavigationUtils";

export function ProtectedRoute({ children, requiredPageId, requiredPermission = "Can_View" }) {
  const context = useContext(AuthContext);
  const location = useLocation();

  // Not logged in? Redirect to login
  if (!context.state.isAuthenticated) {
    return <Navigate to="/SignIn" state={{ from: location }} replace />;
  }

  // Admin always allowed
  if (context.state.usertype?.User_Type_Name === "Admin") {
    return children;
  }

  // Check permission for this page
  const hasPerm = navigationUtils.hasPermission(
    context.state.permissions,
    requiredPageId,
    requiredPermission
  );

  if (!hasPerm) {
    return <Navigate to="/error/403" replace />;
  }

  return children;
}

export default ProtectedRoute; 