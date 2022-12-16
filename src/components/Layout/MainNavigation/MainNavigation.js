import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth-context";

const MainNavigation = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const isLogin = authCtx.isAuthenticated;

    const clickHandler = () => {
        if (isLogin) {
            // means logout
            authCtx.onLogout();
            navigate("/auth/signin", { replace: true });
        } else {
            // means login
            navigate("/auth/signin", { replace: true });
        }
    };

    const verifyEmailHandler = async () => {
        const res = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_API}`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: authCtx.token,
                }),
            }
        );

        const data = await res.json();

        if (res.ok) {
            alert("Email verification link sent to your email.");
        } else {
            alert(data.error.message);
        }
    };

    return (
        <div>
            <header className="ba bg-near-white black-80 tc pb4 avenir">
                <h1 className="mt2 mb0 baskerville i fw1 f1">Title</h1>
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
                    {authCtx.isAuthenticated && (
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
                        {isLogin ? "Logout" : "Login"}
                    </div>

                    {!authCtx.isVerified && authCtx.isProfileCompleted && (
                        <div
                            onClick={verifyEmailHandler}
                            className="link pointer underline dark-blue hover-light-blue dark-gray f6 f5-ns dib mr3 mr4-ns"
                        >
                            Verify Email
                        </div>
                    )}
                </nav>
            </header>
        </div>
    );
};

export default MainNavigation;
