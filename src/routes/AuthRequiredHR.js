import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";


function AuthRequiredHR({ children }) {
    const { isInitialized, isAuthenticated, user } = useAuth();
    const location = useLocation();
    const allowedRole = ["HR"];

    if(!isInitialized) {
        return <LoadingScreen />
    }

    if(!isAuthenticated) {
        <Navigate to="/login" state={{ state: location }} replace />
    }

    const result = allowedRole.includes(user?.department)
    console.log("user require",user)
    console.log("result",result)

    if(result) {
        return children
    } else {
        return <Navigate to="/" />
    }
}

export default AuthRequiredHR;
