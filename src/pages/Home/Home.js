import React, {useContext, useState} from "react";
import Profile from "../../components/UI/Modals/Profile";
import AuthContext from "../../store/auth-context";
import UpdateForm from "../../components/UpdateForm/UpdateForm";

const Home = () => {
    const authCtx = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);

    const formToggleHandler = () => {
        setIsOpen(true)
    }

    return (<>
        {authCtx.isAuthenticated && !authCtx.isProfileCompleted && (<Profile onClick={formToggleHandler}/>)}
        {authCtx.isAuthenticated && !authCtx.isProfileCompleted && isOpen && <UpdateForm/>}
        {!authCtx.isAuthenticated &&
            <div className="tc"><h1>Home Page</h1><p>You're not logged in! Please login to experience full
                features.</p></div>}
        {authCtx.isAuthenticated && <h1 className="tc fw-8">Home</h1>}


    </>);
};

export default Home;
