import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props  }) => {
  return (
    props.loggedIn ? Component : <Navigate to="/signin" replace/>
)}

export default ProtectedRoute;
