import React from "react";
import MainNavigation from "../MainNavigation/MainNavigation";

const Layout = (props) => {
    return (
        <>
            <MainNavigation />
            {props.children}
        </>
    );
};

export default Layout;
