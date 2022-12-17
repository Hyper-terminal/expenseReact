import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../../store/expenseSlice";
import EditModal from "../../UI/Modals/EditModal";
import { expenseRemove } from "../../../utils/expenseApi";

const Expense = (props) => {
    const dispatch = useDispatch();

    const [isShown, setIsShown] = useState(false);

    const deleteHandler = async () => {
        const { res, data } = await expenseRemove(props.id);

        if (res.ok) {
            dispatch(expenseActions.removeExpense(props.id));
        } else {
            dispatch(expenseActions.errorInExpense(data.error.message));
        }
    };

    const updateModalToggleHandler = () => {
        setIsShown((prev) => !prev);
    };

    return (
        <>
            {isShown && <EditModal onToggle={updateModalToggleHandler} item={props} />}

            <div className="mw6 center shadow-5 db br3 pa2 mt4 ml3 mr3 bg-moon-gray">
                <div className="flex flex-column align-between athelas ml0 mt0 pl4 black-90 bl bw2 b--blue">
                    <h4>
                        <span className="uderline purple fw8">PRICE: </span> ₹
                        {props.price}
                    </h4>
                    <h4 className="mt0">
                        <span className="underline purple fw8 ">
                            DESCRIPTION:
                        </span>{" "}
                        {props.description}
                    </h4>
                    <h4 className="mt0">
                        <span className="underline purple fw8">Category:</span>
                        {props.category}
                    </h4>
                </div>
                <hr className="shadow-5" />
                <div className="mt2 flex justify-between flex-wrap">
                    <button
                        onClick={deleteHandler}
                        className="f6 shadow-5 link dim ph3 ml4 mr4 pv2 mb2 dib white bg-dark-red br3 pointer  b--none"
                    >
                        Delete
                    </button>
                    <button
                        onClick={updateModalToggleHandler}
                        className="f6 shadow-5 link dim ph3 mr4 ml4 pv2 mb2 dib white bg-purple br3 pointer b--none"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </>
    );
};

export default Expense;
