import React, {Suspense, useContext} from "react";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout/Layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";
import AuthContext from "./store/auth-context";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const UpdateForm = React.lazy(() =>
    import("./components/UpdateForm/UpdateForm")
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
    const authCtx = useContext(AuthContext);
    return (
        <Suspense fallback={<LoadingSpinner/>}>


            <Layout>
                <Routes>

                    <Route path="/" element={<Home/>}/>

                    <Route path="/about" element={<About/>}/>

                    {!authCtx.isAuthenticated && (
                        <Route path="/auth">
                            <Route path="signin" element={<AuthSignin/>}/>
                            <Route path="signup" element={<AuthSignup/>}/>
                        </Route>
                    )}

                    <Route path="*" element={<ErrorPage/>}/>


                </Routes>
            </Layout>

        </Suspense>
    );
};

export default App;
