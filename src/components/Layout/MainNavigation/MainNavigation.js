import React, {useContext} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import AuthContext from "../../../store/auth-context";

const MainNavigation = () => {

    const authCtx = useContext(AuthContext)
    const navigate = useNavigate();

    const isLogin = authCtx.isAuthenticated;

    const clickHandler = () => {
        if (isLogin) {
            // means logout
            authCtx.onLogout();
            navigate('/auth/signin', {replace: true})
        } else {
            // means login
            navigate('/auth/signin')
        }
    }

    return (<div>
        <header className="ba bg-near-white black-80 tc pb4 avenir">
            <h1 className="mt2 mb0 baskerville i fw1 f1">Title</h1>
            <h2 className="mt2 mb0 f6 fw4 ttu tracked">
                Your amazing subtitle
            </h2>
            <nav className="bt bb tc mw7 center mt4">
                <NavLink
                    className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l"
                    to="/"
                    style={({isActive}) => isActive ? {background: "#CDECFF "} : undefined}
                >
                    Home
                </NavLink>
                <NavLink
                    className="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l"
                    to="/products"
                    style={({isActive}) => isActive ? {background: "#9EEBCF "} : undefined}
                >
                    Products
                </NavLink>

                <NavLink
                    className="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l"
                    to="/about"
                    style={({isActive}) => isActive ? {background: "#FFA3D7 "} : undefined}
                >
                    About Us
                </NavLink>

                <div
                    onClick={clickHandler}
                    className="f6 pointer bl bt f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 shadow-5 br2 ph4-l"
                >
                    {isLogin ? "Logout" : "Login"}
                </div>

            </nav>
        </header>
    </div>);
};

export default MainNavigation;
