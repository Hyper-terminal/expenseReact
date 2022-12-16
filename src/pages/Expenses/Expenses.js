import React, { useContext, useState } from "react";
import ExpenseForm from "../../components/Expenses/ExpenseForm/ExpenseForm";
import ExpenseList from "../../components/Expenses/ExpenseList/ExpenseList";
import ErrorModal from "../../components/UI/Modals/ErrorModal";
import ExpenseContext from "../../store/expense-context";

const Expenses = () => {
    const expenseCtx = useContext(ExpenseContext);

    const [isOpen, setIsOpen] = useState(false);

    const clickHandler = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <>
            {expenseCtx.err && <ErrorModal message={expenseCtx.err} />}
            {isOpen && <ExpenseForm onToggle={clickHandler} />}
            {!isOpen && (
                <div
                    onClick={clickHandler}
                    className="mw8 tc shadow-5 fw6 f3 lh-copy center bg-animate mt4 pa3 pointer bg-light-purple hover-bg-purple br3"
                >
                    Add Expense
                </div>
            )}

            {expenseCtx.expenses.length > 0 && <ExpenseList />}
            {expenseCtx.expenses.length === 0 && (
                <h1 className="tc mt5">No Expenses Found</h1>
            )}
        </>
    );
};

export default Expenses;
