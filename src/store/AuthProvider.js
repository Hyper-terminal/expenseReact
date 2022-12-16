import React, { useEffect, useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
    const initialToken = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null;
    const [token, setToken] = useState(initialToken);
    const [isProfileCompleted, setIsProfileCompleted] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    const fetchUpdateDetails = async () => {
        const res = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_API}`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idToken: token,
                }),
            }
        );

        const data = await res.json();

        if (res.ok) {
            setIsVerified(data.users[0].emailVerified);
            const emailComplete = data.users[0].displayName ? true : false;
            setIsProfileCompleted(emailComplete);
        } else {
            console.log("Token not valid");
        }
    };

    useEffect(() => {
        fetchUpdateDetails();
    }, [token]);

    const isAuthenticated = !!token;

    const contextVal = {
        isProfileCompleted,
        isAuthenticated,
        token,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        isVerified,
    };

    return (
        <AuthContext.Provider value={contextVal}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
