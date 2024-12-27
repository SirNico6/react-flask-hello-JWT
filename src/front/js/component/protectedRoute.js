import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext"; 

const ProtectedRoute = ({ children }) => {
  const { store } = useContext(Context);

  const token = store.token || localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
