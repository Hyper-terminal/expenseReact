import React, { useState } from "react";
import passwordImage from "../../assets/password_change.jpg";
import { passwordChange } from "../../utils/authApi";

const PasswordChange = () => {
    const [email, setEmail] = useState("");

    function inputHandler(e) {
        setEmail(e.target.value);
    }

    async function submitHandler() {
        const { res } = await passwordChange(email);
        if (res.ok) {
            setEmail("");
            alert("Request sent to your email address");
        } else {
            alert(data.error.message);
        }
    }

    return (
        <section className="ph3 vh-100 ph5-ns pv5">
            <article className="mw8 shadow-5 center br2 ba b--light-blue bg-lightest-blue">
                <div className="dt-ns dt--fixed-ns w-100">
                    <div className="dtc-ns bg-washed-red tc pa3 pa4-ns v-mid">
                        <div>
                            <img
                                className="h5 centered tc"
                                src={passwordImage}
                                alt="password change or reset"
                            />
                        </div>
                    </div>
                    <div className="pa3 pa4-ns dtc-ns v-mid">
                        <input
                            type="email"
                            value={email}
                            onChange={inputHandler}
                            className="w-100 b--blue mb3 br2 db tc pv3"
                            placeholder="Please enter your email..."
                        />
                        <div
                            onClick={submitHandler}
                            className="no-underline pointer f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2"
                        >
                            Send Link
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
};

export default PasswordChange;
