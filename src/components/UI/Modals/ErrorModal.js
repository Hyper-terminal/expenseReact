import React from "react";

const ErrorModal = (props) => {
    return (
        <div className="flex items-center justify-center pa3 bg-light-red navy">
            <svg
                className="w1 mt1"
                data-icon="info"
                viewBox="0 0 32 32"
                style={{ fill: "currentcolor" }}
            >
                <title>info icon</title>
                <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
            </svg>
            <span className="lh-title ml3">{props.message}</span>
        </div>
    );
};

export default ErrorModal;
