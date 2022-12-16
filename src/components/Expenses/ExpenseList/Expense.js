import React from "react";

const Expense = (props) => {
    console.log(props);
    return (
        <div class="mw6 shadow-5 db br3 pa2 mt4 ml3 mr3 bg-moon-gray">
            <div class="flex flex-column align-between athelas ml0 mt0 pl4 black-90 bl bw2 b--blue">
                <h1>
                    <span className="underline purple f3 fw8">PRICE:</span> ₹
                    {props.price}
                </h1>
                <p class="f5 f4-m f3-l lh-copy measure mt0">
                    <span className="underline purple fw8 f3">
                        DESCRIPTION:
                    </span>{" "}
                    {props.description}
                </p>
                <p class="f6 ttu tracked fs-normal">
                    <span className="underline purple fw8">Category:</span>{" "}
                    {props.category}
                </p>
            </div>
        </div>
    );
};

export default Expense;
