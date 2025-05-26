import React from "react";
import { Navigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Private = ({ children }) => {
  const { store } = useGlobalReducer();

  // Si no hay token, manda al login ("/")
  if (!store.token) {
    alert("No tienes acceso a esta página. Debes iniciar sesión.");
    return <Navigate to="/" replace />;
  }

  // Si hay token, renderiza lo que venga
  return children;
};

export default Private;