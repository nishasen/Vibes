import React from 'react';
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../Contexts";

const RequireAuth = () => {
  const { userLogin } = useAuth();
  const location = useLocation();
  return userLogin ? <Outlet /> : <Navigate state={{ from: location }} to="/login" replace />
}

export { RequireAuth };