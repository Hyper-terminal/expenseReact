import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpenseForm from "../../components/Expenses/ExpenseForm/ExpenseForm";
import ExpenseList from "../../components/Expenses/ExpenseList/ExpenseList";
import ErrorModal from "../../components/UI/Modals/ErrorModal";
import { expenseActions } from "../../store/expenseSlice";
import { getExpenses } from "../../utils/expenseApi";

const Expenses = () => {
    const expenseErr = useSelector((state) => state.expense.error);
    const expenses = useSelector((state) => state.expense.expenses);
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const clickHandler = () => {
        setIsOpen((prev) => !prev);
    };

    const getAllExpenses = useCallback(async () => {
        const { res, data } = await getExpenses();

        if (res.ok) {
            const result = [];
            for (let key in data) {
                result.push({ id: key.toString(), ...data[key] });
            }
            dispatch(expenseActions.getExpense(result));
        } else {
            dispatch(expenseActions.errorInExpense(data.error.message));
        }
    }, []);

    useEffect(() => {
        getAllExpenses();
    }, [getAllExpenses]);

    return (
        <>
            {expenseErr && <ErrorModal message={expenseErr} />}
            {isOpen && <ExpenseForm onToggle={clickHandler} />}
            {!isOpen && (
                <div
                    onClick={clickHandler}
                    className="mw8 tc shadow-5 fw6 f3 lh-copy center bg-animate mt4 pa3 pointer bg-light-purple hover-bg-purple br3"
                >
                    Add Expense
                </div>
            )}

            {expenses.length > 0 && <ExpenseList />}
            {expenses.length === 0 && (
                <h1 className="tc mt5">No Expenses Found</h1>
            )}
        </>
    );
};

export default Expenses;
