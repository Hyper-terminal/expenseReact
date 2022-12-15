import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../components/UI/Modals/Profile";
import AuthContext from "../../store/auth-context";

const Home = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(true);
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const modalClickHandler = () => {
        setIsProfileOpen(false);
    };

    const buttonClickHandler = () => {
        navigate("/update_profile");
    };

    return (
        <>
            {authCtx.isAuthenticated && isProfileOpen && (
                <Profile
                    onButtonClick={buttonClickHandler}
                    onClose={modalClickHandler}
                />
            )}
            <h1 className="fw-8 tc">Home page</h1>
        </>
    );
};

export default Home;
