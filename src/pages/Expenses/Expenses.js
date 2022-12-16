import React, { useCallback, useEffect, useState } from "react";
import ExpenseForm from "../../components/Expenses/ExpenseForm/ExpenseForm";
import ExpenseList from "../../components/Expenses/ExpenseList/ExpenseList";
import ErrorModal from "../../components/UI/Modals/ErrorModal";

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    let err = false;

    const clickHandler = () => {
        setIsOpen(true);
    };

    const fetchExpenses = useCallback(async () => {
        const res = await fetch(
            "https://expensetracker-77f96-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
        );

        const data = await res.json();

        if (res.ok) {
            const result = [];
            for (let key in data) {
                result.push(data[key]);
            }

            setExpenses((prev) => [...result]);
        } else {
            err = data.error.message;
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    const submitHandler = async (item) => {
        const res = await fetch(
            "https://expensetracker-77f96-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            }
        );

        const data = await res.json();

        if (res.ok) {
            setIsOpen(false);
            setExpenses((prev) => [...prev, item]);
        } else {
            err = data.errpr.message;
        }
    };

    return (
        <>
            {err && <ErrorModal message={err} />}
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
            {expenses.length < 1 && (
                <h1 className="tc mt5">No Expenses Found</h1>
            )}
        </>
    );
};

export default Expenses;
