import { createSlice } from "@reduxjs/toolkit";

const initialExpState = {
    expenses: [],
};

const expenseSlice = createSlice({
    initialState: initialExpState,
    name: "expense",
    reducers: {
        addExpense(expense) {
            state.expenses.push(expense);
        },
        removeExpense() {
            state.expense.pop();
        },
    },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
