import React, { Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { useSelector } from "react-redux";

const Expenses = React.lazy(() => import("./pages/Expenses/Expenses"));

const PasswordChange = React.lazy(() =>
    import("./pages/PasswordChange/PasswordChange")
);

const AuthSignin = React.lazy(() =>
    import("./components/AuthSignin/AuthSignin")
);
const AuthSignup = React.lazy(() =>
    import("./components/AuthSignup/AuthSignup")
);
const About = React.lazy(() => import("./pages/About/About"));
const Home = React.lazy(() => import("./pages/Home/Home"));

const App = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const theme = useSelector((state) => state.theme.theme);
    console.log(theme);
    return (
        <div className={theme ? theme : ""}>
            <Suspense fallback={<LoadingSpinner />}>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/about" element={<About />} />

                        {isAuthenticated && (
                            <Route path="/expenses" element={<Expenses />} />
                        )}

                        {!isAuthenticated && (
                            <Route path="/auth">
                                <Route path="signin" element={<AuthSignin />} />
                                <Route path="signup" element={<AuthSignup />} />
                                <Route
                                    path="password_forget"
                                    element={<PasswordChange />}
                                />
                            </Route>
                        )}

                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Layout>
            </Suspense>
        </div>
    );
};

export default App;
