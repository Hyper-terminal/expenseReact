import React, {useEffect, useState} from "react";

const AuthContext = React.createContext({
    isAuthenticated: false, onLogin: () => {
    }, onLogout: () => {
    }, isProfileCompleted: false,token: String,isVerified: false
});

export default AuthContext;
