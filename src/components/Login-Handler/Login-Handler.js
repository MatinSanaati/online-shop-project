import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LoginForm } from "../Login-Form/Login-Form";
import { Loading } from "../Loading/Loading";

export const LoginHandler = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/Login-Form") {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setShowLogin(true);
            }, 3000);
        } else {
            setShowLogin(false);
        }
    }, [location.pathname]);

    if (loading) {
        return (
            <Loading />
        );
    }

    if (showLogin) {
        return <LoginForm />;
    }

    return <>{children}</>;
};
