import React, { useContext, useRef } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../../store/expenseSlice";
import { expenseAdd } from "../../../utils/expenseApi";

const ExpenseForm = (props) => {
    const dispatch = useDispatch();

    const amountRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();

        const price = Number(amountRef.current.value);
        const description = descriptionRef.current.value;
        const category = categoryRef.current.value;

        const newItem = { price, description, category };
        // send add http request
        const { res, data } = await expenseAdd(newItem);

        if (res.ok) {
            const item = { ...newItem, id: data.name };
            dispatch(expenseActions.addExpense(item));
        } else {
            dispatch(expenseActions.errorInExpense(data.error.message));
        }

        props.onToggle();
    };

    return (
        <main className="pa4 ">
            <form
                onSubmit={submitHandler}
                className="pa4 br2 bl bb shadow-5 mw6 center"
            >
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <div className="mt3 flex flex-wrap justify-between">
                        <label
                            className=" fw6 lh-copy f6"
                            htmlFor="email-address"
                        >
                            Amount
                        </label>
                        <input
                            className="b ml4 pa2 br2 input-reset ba bg-transparent hover-bg-light-pink w-70"
                            type="number"
                            name="amount"
                            placeholder="₹"
                            ref={amountRef}
                            required
                        />
                    </div>
                    <div className="mt3 flex flex-wrap justify-between">
                        <label className=" fw6 lh-copy f6" htmlFor="password">
                            Description
                        </label>
                        <input
                            className="b ml4 br2 pa2 input-reset  ba bg-transparent hover-bg-light-pink w-70"
                            type="text"
                            ref={descriptionRef}
                            name="description"
                            placeholder="For what it was?"
                            required
                        />
                    </div>

                    <div className="flex flex-wrap justify-between mt3">
                        <label className="fw6 lh-copy f6" htmlFor="cars">
                            Category:
                        </label>
                        <select
                            ref={categoryRef}
                            className="w5 ml4 tc bg-transparent hover-bg-light-pink ba br2 w-70"
                            name="category"
                        >
                            <option value="Food">Food</option>
                            <option value="Salary">Salary</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Travel">Travel</option>
                        </select>
                    </div>
                </fieldset>
                <div className="mt3">
                    <button
                        className="f6 w-100 link dim br3  ph4 pv3 mb2 dib white bg-purple pointer b--none"
                        type="submit"
                    >
                        Add Expense
                    </button>
                </div>
            </form>
        </main>
    );
};

export default ExpenseForm;
