import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthSignin from "./components/AuthSignin/AuthSignin";
import Layout from "./components/Layout/Layout/Layout";
import AuthSignup from "./components/AuthSignup/AuthSignup";

const Home = React.lazy(() => import("./pages/Home/Home"));

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/auth">
                    <Route path="signin" element={<AuthSignin />} />
                    <Route path="signup" element={<AuthSignup />} />
                </Route>
            </Routes>
        </Layout>
    );
};

export default App;
