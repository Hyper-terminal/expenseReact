import React, { useContext, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import profileIcon from "../../assets/name_icon.svg";
import userImageIcon from "../../assets/user_image.svg";
import { updateUserDetails } from "../../utils/authApi";

const UpdateForm = () => {
    const idToken = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    const nameRef = useRef();
    const picUrlRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();

        const fullName = nameRef.current.value;
        const picUrl = picUrlRef.current.value;

        // send request to backend for update
        const {res} = await updateUserDetails(idToken, picUrl, fullName);

        if (res.ok) {
            navigate("/expenses", { replace: true });
        } else {
            alert(data.error.message);
        }
    };

    return (
        <section className="w-100 mt4 tc">
            <form
                onSubmit={submitHandler}
                className="pa3 mw7 br4 bg-washed-red shadow-5 bb bl center black-80 b--silver"
            >
                <h1 className="black underline georgia mb4">Update Details</h1>
                <div className="measure mr4 dib">
                    <label htmlFor="name" className="f4 b db mb2">
                        <img
                            className="dib h1"
                            src={profileIcon}
                            alt="full name input"
                        />{" "}
                        Full Name
                    </label>
                    <input
                        ref={nameRef}
                        name="name"
                        className="input-reset ba b--light-silver br3 pa2 mb2 db w-100"
                        type="text"
                        aria-describedby="name-desc"
                    />
                </div>
                <div className="measure  mr4 dib">
                    <label htmlFor="name" className="f4 b db mb2">
                        <img
                            src={userImageIcon}
                            className="h1 dib"
                            alt="profile input"
                        />
                        Profile Photo Url
                    </label>
                    <input
                        ref={picUrlRef}
                        name="profileImage"
                        className="input-reset ba b--light-silver br3 pa2 mb2 db w-100"
                        type="text"
                        aria-describedby="name-desc"
                    />
                </div>
                <div className="db mt3">
                    <button
                        className="f4 link dim br3 ph4 pv2 mb2 dib white bg-dark-blue pointer b--none"
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </form>
        </section>
    );
};

export default UpdateForm;
