import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import ErrorModal from "../UI/Modals/ErrorModal";

const AuthSignin = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const [err, setErr] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const inputHandler = (event) => {
        setErr(false);

        const { name, value } = event.target;

        setFormData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            // make post request to backend

            const res = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        returnSecureToken: true,
                    }),
                }
            );
            
            const data = await res.json();

            if (res.ok) {
                // change state and store token
                authCtx.onLogin(data.idToken);

                // clear fields
                setFormData({
                    email: "",
                    password: "",
                });

                // redirect the user
                navigate("/", { replace: true });
            } else {
                setErr(data.error.message);
                throw new Error(data.error.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <main className="pa4  black-80">
            <form
                onSubmit={submitHandler}
                className="pa4 br2 shadow-3 measure center"
            >
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 tc fw8 ph0 mh0">Sign In</legend>
                    {err && <ErrorModal message={err} />}
                    <div className="mt3">
                        <label
                            className="db fw6 lh-copy f6"
                            htmlFor="email-address"
                        >
                            Email
                        </label>
                        <input
                            value={formData.email}
                            className="pa2 br2 input-reset ba bg-transparent  hover-bg-black hover-white w-100"
                            type="email"
                            name="email"
                            onChange={inputHandler}
                            required
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="b br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            onChange={inputHandler}
                            name="password"
                            value={formData.password}
                            required
                        />
                    </div>
                </fieldset>
                <div className="">
                    <button
                        className="f6 link dim br3 ph4 pv2 mb2 dib white  bg-dark-gray pointer b--none"
                        type="submit"
                    >
                        Sign in
                    </button>
                </div>
                <div className="lh-copy mt3">
                    <Link to="/auth/signup" className="f6 link dim black db">
                        New User? Signup
                    </Link>
                    <Link
                        to="/auth/password_forget"
                        className="f6 link dim black db"
                    >
                        Forget your password?
                    </Link>
                </div>
            </form>
        </main>
    );
};

export default AuthSignin;
