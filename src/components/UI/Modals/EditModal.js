import React, { useEffect, useRef, useContext } from "react";
import { useDispatch } from "react-redux";
import { expenseActions } from "../../../store/expenseSlice";
import { expenseUpdate } from "../../../utils/expenseApi";
import classes from "./EditModal.module.css";

const EditModal = (props) => {
    const dispatch = useDispatch();

    const amountRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    useEffect(() => {
        amountRef.current.value = props.item.price;
        descriptionRef.current.value = props.item.description;
        categoryRef.current.value = props.item.category;
    }, []);

    const submitHandler = async (event) => {
        event.preventDefault();

        const newItem = {
            price: Number(amountRef.current.value),
            description: descriptionRef.current.value,
            category: categoryRef.current.value,
        };
        // update in database
        const { res, data } = await expenseUpdate(props.item.id, newItem);

        if (res.ok) {
            dispatch(
                expenseActions.updateExpense({ id: props.item.id, newItem })
            );
        } else {
            dispatch(expenseActions.errorInExpense(data.error.message));
        }

        props.onToggle();
    };

    return (
        <article>
            <div
                className={classes.backdrop}
                onClick={() => {
                    props.onToggle();
                }}
            />
            <main className={`black-80 ${classes.overlay}`}>
                <form
                    onSubmit={submitHandler}
                    className="pa4 br4 bl tc bb bg-washed-red shadow-5 mw7 center"
                >
                    <fieldset
                        id="sign_up"
                        className="ba b--transparent ph0 mh0"
                    >
                        <div className="mt3">
                            <label
                                className=" fw6 db lh-copy f6"
                                htmlFor="email-address"
                            >
                                Amount
                                <input
                                    className="b center db pa2 br2 input-reset ba bg-transparent hover-bg-light-pink w-70"
                                    type="number"
                                    name="amount"
                                    placeholder="₹"
                                    ref={amountRef}
                                    required
                                />
                            </label>
                        </div>
                        <div className="mt3">
                            <label
                                className=" fw6 db lh-copy f6"
                                htmlFor="password"
                            >
                                Description
                                <input
                                    className="b center db br2 pa2 input-reset  ba bg-transparent hover-bg-light-pink w-70"
                                    type="text"
                                    ref={descriptionRef}
                                    name="description"
                                    placeholder="For what it was?"
                                    required
                                />
                            </label>
                        </div>

                        <div className="mt3">
                            <label className="fw6 db lh-copy f6" htmlFor="cars">
                                Category:
                            </label>
                            <select
                                ref={categoryRef}
                                className="w5 db center pa2 tc bg-transparent hover-bg-light-pink ba br2 w-70"
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
                            Update Expense
                        </button>
                    </div>
                </form>
            </main>
        </article>
    );
};

export default EditModal;
