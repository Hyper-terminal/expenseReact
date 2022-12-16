import React from "react";

const Expense = (props) => {
    return (
        <div className="mw6 shadow-5 db br3 pa2 mt4 ml3 mr3 bg-moon-gray">
            <div className="flex flex-column align-between athelas ml0 mt0 pl4 black-90 bl bw2 b--blue">
                <h1>
                    <span className="underline purple f3 fw8">PRICE:</span> ₹
                    {props.price}
                </h1>
                <p className="f5 f4-m f3-l lh-copy measure mt0">
                    <span className="underline purple fw8 f3">
                        DESCRIPTION:
                    </span>{" "}
                    {props.description}
                </p>
                <p className="f6 ttu tracked fs-normal">
                    <span className="underline purple fw8">Category:</span>{" "}
                    {props.category}
                </p>
            </div>
        </div>
    );
};

export default Expense;
