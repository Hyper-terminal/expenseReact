import React from "react";

const ExpenseContext = React.createContext({
    onAdd: Function,
    onRemove: Function,
    onUpdate: Function,
    expenses: [],
    err: String,
});

export default ExpenseContext;
