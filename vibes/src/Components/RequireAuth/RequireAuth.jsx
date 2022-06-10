import React from 'react';
import { Navigate, useLocation, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const location = useLocation();
  return localStorage.getItem("userToken") ? <Outlet /> : <Navigate state={{ from: location }} to="/login" replace />
}

export { RequireAuth };