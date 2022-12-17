import React, { useCallback, useEffect, useState } from "react";
import Profile from "../../components/UI/Modals/Profile";
import UpdateForm from "../../components/UpdateForm/UpdateForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";

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
            dispatch(
                authActions.update(data.users[0].displayName ? true : false)
            );
        } else {
            console.log("Token not valid");
        }
    });

    useEffect(() => {
        fetchUpdateDetails();
    }, [fetchUpdateDetails]);

    return (
        <>
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
        </>
    );
};

export default Home;
