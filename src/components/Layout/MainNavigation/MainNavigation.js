import React from "react";
import { Link } from "react-router-dom";

const MainNavigation = () => {
    return (
        <div>
            <header className="ba bg-white black-80 tc pb4 avenir">
                <h1 className="mt2 mb0 baskerville i fw1 f1">Title</h1>
                <h2 className="mt2 mb0 f6 fw4 ttu tracked">
                    Your amazing subtitle
                </h2>
                <nav className="bt bb tc mw7 center mt4">
                    <Link
                        className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l"
                        to="/home"
                    >
                        Home
                    </Link>
                    <Link
                        className="f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l"
                        to="/products"
                    >
                        Products
                    </Link>

                    <Link
                        className="f6 f5-l link bg-animate black-80 hover-bg-light-pink dib pa3 ph4-l"
                        to="/about"
                    >
                        About Us
                    </Link>
                </nav>
            </header>
        </div>
    );
};

export default MainNavigation;
