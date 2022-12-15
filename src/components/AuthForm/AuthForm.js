import React, { useState } from "react";

const AuthForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const inputHandler = (event) => {
        const { name, value } = event.target;

        setFormData((prev) => {
            return { ...prev, [name]: value };
        });
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            if (formData.password !== formData.confirmPassword) {
                alert("password not matched!");
                return;
            }

            // make post request to backend

            const res = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API}`,
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
                console.log(data.idToken);

                // clear fields

                setFormData({
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
            } else {
                throw new Error(data.error.message);
            }
        } catch (err) {
            alert(err);
        }
    };

    return (
        <main className="pa4  black-80">
            <form
                onSubmit={submitHandler}
                className="pa4 br2 shadow-3 measure center"
            >
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 tc fw8 ph0 mh0">Sign Up</legend>
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
                    <a href="#0" className="f6 link dim black dib">
                        Have an account? Login
                    </a>
                </div>
            </form>
        </main>
    );
};

export default AuthForm;
