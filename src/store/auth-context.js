import React, { useState } from "react";

const AuthContext = React.createContext({
    isAuthenticated: false,
    onLogin: () => {},
    onLogout: () => {},
});

export const AuthProvider = (props) => {
    const initialToken = localStorage.getItem("token")
        ? localStorage.getItem("token")
        : "";

    const [token, setToken] = useState(initialToken);

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    };

    const logoutHandler = () => {
        setToken("");
        localStorage.removeItem("token");
    };

    const isAuthenticated = !!token;

    const contextVal = {
        isAuthenticated: isAuthenticated,
        token: token,
        onLogin: loginHandler,
        onLogout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextVal}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
