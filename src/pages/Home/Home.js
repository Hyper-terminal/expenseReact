import React, { useCallback, useEffect, useState } from "react";
import Profile from "../../components/UI/Modals/Profile";
import UpdateForm from "../../components/UpdateForm/UpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
import { getDetails } from "../../utils/authApi";

const Home = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const token = useSelector((state) => state.auth.token);

    const isProfileComplete = useSelector(
        (state) => state.auth.isProfileComplete
    );
    const [isOpen, setIsOpen] = useState(false);

    const formToggleHandler = () => {
        setIsOpen(true);
    };

    const fetchUpdateDetails = useCallback(async () => {
        const { res, data } = await getDetails(token);

        if (res.ok) {
            const verify = data.users[0].emailVerified;
            const profile = data.users[0].displayName ? true : false;
            dispatch(authActions.update({ verify, profile }));
        } else {
            console.log("Token not valid");
        }
    });

    useEffect(() => {
        fetchUpdateDetails();
    }, [fetchUpdateDetails]);

    return (
        <div className="vh-100">
            {isAuthenticated && !isProfileComplete && !isOpen && (
                <Profile onClick={formToggleHandler} />
            )}
            {isAuthenticated && !isProfileComplete && isOpen && <UpdateForm />}
            {!isAuthenticated && (
                <div className="tc">
                    <h1>Home Page</h1>
                    <p>
                        You're not logged in! Please login to experience full
                        features.
                    </p>
                </div>
            )}
            {isAuthenticated && isProfileComplete && (
                <h1 className="tc">Home Page</h1>
            )}
        </div>
    );
};

export default Home;
