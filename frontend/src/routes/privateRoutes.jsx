import React from 'react'
import { Navigate } from "react-router-dom";

function privateRoutes({ children }) {
     const authToken = localStorage.getItem("TOKEN") ;

     return authToken ? children : <Navigate to="/login" />;
}

export default privateRoutes;