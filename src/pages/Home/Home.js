import React, {useContext, useState} from "react";
import Profile from "../../components/UI/Modals/Profile";
import AuthContext from "../../store/auth-context";

const Home = () => {
    const authCtx = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);

    const formToggleHandler = () => {
        setIsOpen(true)
    }

    return (
        <>
            {authCtx.isAuthenticated && !authCtx.isProfileCompleted && (<Profile onClick={formToggleHandler}/>)}
            {authCtx.isAuthenticated && !authCtx.isProfileCompleted && isOpen && <UpdateForm />}
            {authCtx.isProfileCompleted && <h1>Home Page</h1>}


        </>);
};

export default Home;
