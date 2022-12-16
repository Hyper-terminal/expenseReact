import React, {useEffect, useState} from "react";

const AuthContext = React.createContext({
    isAuthenticated: false, onLogin: () => {
    }, onLogout: () => {
    }, isProfileCompleted: false, updatedName: String, updatedPic: String
});

export const AuthProvider = (props) => {
    const initialToken = localStorage.getItem("token") ? localStorage.getItem("token") : null;
    const [token, setToken] = useState(initialToken);
    const [isProfileCompleted, setIsProfileCompleted] = useState(false);

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    const isAuthenticated = !!token;

    const fetchUpdateDetails = async () => {
        const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_API}`, {
            method: 'post', headers: {
                "Content-Type": 'application/json'
            }, body: JSON.stringify({
                idToken: token
            })
        });

        const data = await res.json();

        if (res.ok) {
            setIsProfileCompleted(true)
        } else {
            console.log("Token not valid")
        }
    }

    useEffect(() => {
        fetchUpdateDetails();
    }, [token])

    const contextVal = {
        isProfileCompleted: isProfileCompleted,
        isAuthenticated: isAuthenticated,
        token: token,
        onLogin: loginHandler,
        onLogout: logoutHandler,
    };

    return (<AuthContext.Provider value={contextVal}>
        {props.children}
    </AuthContext.Provider>);
};

export default AuthContext;
