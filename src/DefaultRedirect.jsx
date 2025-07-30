import React, { useContext } from "react";
import { AuthContext } from "./ContextOrRedux/AuthContext";
import { Navigate } from "react-router-dom";

export function DefaultRedirect() {
  const context = useContext(AuthContext);
  if (!context.state.isAuthenticated) {
    return <Navigate to="/SignIn" replace />;
  }
  return <Navigate to={context.state.usertype?.Default_Page || "/error/403"} replace />;
}

export default DefaultRedirect; 