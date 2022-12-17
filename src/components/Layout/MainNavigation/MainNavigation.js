import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../../../store/authSlice";
import { emailVerification } from "../../../utils/authApi";

const MainNavigation = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const idToken = useSelector((state) => state.auth.token);
    const isVerified = useSelector((state) => state.auth.isVerified);
    const isProfileComplete = useSelector(
        (state) => state.auth.isProfileComplete
    );

    const navigate = useNavigate();

    const clickHandler = () => {
        if (isAuthenticated) {
            // means logout
            dispatch(authActions.logout());
            navigate("/auth/signin", { replace: true });
        } else {
            // means login
            navigate("/auth/signin", { replace: true });
        }
    };

    const verifyEmailHandler = async () => {
        const { res } = emailVerification(idToken);
        if (res.ok) {
            alert("Email verification link sent to your email.");
        } else {
            alert(data.error.message);
        }
    };

    return (
        <>
            <header className="bb bg-near-white black-80 tc pb4 avenir">
                <h1 className="mt0 mb0 baskerville i fw1 f1">Title</h1>
                <h2 className="mt2 mb0 f6 fw4 ttu tracked">
                    Your amazing subtitle
                </h2>
                <nav className="bt bb tc mw7 center mt4">
                    <NavLink
                        className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l"
                        to="/"
                        style={({ isActive }) =>
                            isActive ? { background: "#CDECFF " } : undefined
                        }
                    >
                        Home
                    </NavLink>
                    {isAuthenticated && (
                        <NavLink
                            className="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l"
                            to="/expenses"
                            style={({ isActive }) =>
                                isActive
                                    ? { background: "#9EEBCF " }
                                    : undefined
                            }
                        >
                            Expenses
                        </NavLink>
                    )}

                    <NavLink
                        className="f6 f5-l mr4 link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l"
                        to="/about"
                        style={({ isActive }) =>
                            isActive ? { background: "#FFA3D7 " } : undefined
                        }
                    >
                        About Us
                    </NavLink>

                    <div
                        onClick={clickHandler}
                        className="link pointer underline dark-green hover-light-green dark-gray f6 f5-ns dib mr3 mr4-ns"
                    >
                        {isAuthenticated ? "Logout" : "Login"}
                    </div>

                    {!isVerified && isProfileComplete && (
                        <div
                            onClick={verifyEmailHandler}
                            className="link pointer underline dark-blue hover-light-blue dark-gray f6 f5-ns dib mr3 mr4-ns"
                        >
                            Verify Email
                        </div>
                    )}
                </nav>
            </header>
        </>
    );
};

export default MainNavigation;
