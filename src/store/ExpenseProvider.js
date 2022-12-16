import React, { useState, useCallback, useEffect } from "react";
import ExpenseContext from "./expense-context";

const ExpenseProvider = (props) => {
    const [expenses, setExpenses] = useState([]);
    const [err, setErr] = useState(false);
    const [count, setCount] = useState(0); // just for the sake of refreshing the page or in other word for useEffect

    // **************************** get on page start *****************************

    const fetchExpenses = useCallback(async () => {
        const res = await fetch(
            "https://expensetracker-77f96-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
        );

        const data = await res.json();

        if (res.ok) {
            const result = [];
            for (let key in data) {
                result.push({ id: key.toString(), ...data[key] });
            }

            setExpenses(() => [...result]);
        } else {
            setErr(data.error.message);
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [count, fetchExpenses]);

    // **************************** remove *****************************

    async function removeHandler(id) {
        const res = await fetch(
            `https://expensetracker-77f96-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`,
            {
                method: "delete",
            }
        );

        const data = await res.json();

        if (res.ok) {
            console.log("deleted successfully");
            setCount((prev) => prev + 1);
        } else {
            console.log(data);
        }
    }

    // **************************** add *****************************

    async function addHandler(item) {
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
            setExpenses((prev) => [...prev, { id: data.name, ...item }]);
        } else {
            setErr(data.error.message);
        }
    }

    // **************************** update *****************************

    async function updateHandler(newItem, id) {
        const res = await fetch(
            `https://expensetracker-77f96-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`,
            {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
            }
        );

        if (res.ok) {
            setCount((prev) => prev - 1);
        } else {
            setErr(data.error.message);
        }
    }

    const contextVal = {
        onAdd: addHandler,
        onRemove: removeHandler,
        onUpdate: updateHandler,
        expenses: expenses,
        err: err,
    };

    return (
        <ExpenseContext.Provider value={contextVal}>
            {props.children}
        </ExpenseContext.Provider>
    );
};

export default ExpenseProvider;
