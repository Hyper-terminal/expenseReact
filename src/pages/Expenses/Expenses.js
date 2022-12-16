import React, { useState } from "react";
import ExpenseForm from "../../components/Expenses/ExpenseForm/ExpenseForm";
import ExpenseList from "../../components/Expenses/ExpenseList/ExpenseList";

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    console.log(expenses);
    const [isOpen, setIsOpen] = useState(false);

    const clickHandler = () => {
        setIsOpen(true);
    };

    const submitHandler = (item) => {
        setIsOpen(false);
        setExpenses((prev) => [...prev, item]);
    };

    return (
        <>
            {isOpen && <ExpenseForm onSubmitExpense={submitHandler} />}
            {!isOpen && (
                <div
                    onClick={clickHandler}
                    className="mw8 tc shadow-5 fw6 f3 lh-copy center bg-animate mt4 pa3 pointer bg-light-purple hover-bg-purple br3"
                >
                    Add Expense
                </div>
            )}

            {expenses.length > 0 && <ExpenseList expenses={expenses} />}
            {expenses.length < 1 && <h1 className="tc mt5">No Expenses Found</h1>}
        </>
    );
};

export default Expenses;
