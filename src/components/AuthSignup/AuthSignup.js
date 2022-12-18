import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../utils/authApi";
import ErrorModal from "../UI/Modals/ErrorModal";

const AuthSignup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [err, setErr] = useState(false);

    const inputHandler = (event) => {
        setErr(false);
        const { name, value } = event.target;

        setFormData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("password not matched!");
            return;
        }

        try {
            // make post request to backend
            const { res, data } = await signup(formData);

            if (res.ok) {
                navigate("/auth/signin", { replace: true });
            } else {
                setErr(data.error.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="pa4 vh-100">
            <form
                onSubmit={submitHandler}
                className="pa4 br2 shadow-3 measure center"
            >
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 tc fw8 ph0 mh0">Sign Up</legend>
                    {err && <ErrorModal />}
                    <div className="mt3">
                        <label
                            className="db fw6 lh-copy f6"
                            htmlFor="email-address"
                        >
                            Email
                        </label>
                        <input
                            value={formData.email}
                            className="pa2 br2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
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
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">
                            Confirm Password
                        </label>
                        <input
                            className="b br2 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                            type="password"
                            onChange={inputHandler}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            required
                        />
                    </div>
                </fieldset>
                <div className="">
                    <button
                        className="f6 link dim br3 ph4 pv2 mb2 dib white  bg-dark-gray pointer b--none"
                        type="submit"
                    >
                        Sign up
                    </button>
                </div>
                <div className="lh-copy mt3">
                    <Link to="/auth/signin" className="f6 link dim  dib">
                        Have an account? Login
                    </Link>
                </div>
            </form>
        </main>
    );
};

export default AuthSignup;
