import { createSlice } from "@reduxjs/toolkit";

const initialExpState = {
    expenses: [],
    premium: false,
    totalAmount: 0,
    error: "",
};

const expenseSlice = createSlice({
    initialState: initialExpState,
    name: "expense",
    reducers: {
        getExpense(state, action) {
            state.expenses = action.payload;
            let totalAmount = 0;
            if (action.payload.length > 0) {
                action.payload.forEach((item) => {
                    totalAmount += Number(item.price);
                });
                state.totalAmount = totalAmount;
            }

            state.premium = state.totalAmount > 10000 ? true : false;
        },

        addExpense(state, action) {
            state.totalAmount += action.payload.price;
            state.expenses = [action.payload, ...state.expenses];
            state.premium = state.totalAmount > 10000 ? true : false;
        },

        removeExpense(state, action) {
            // find deleting id

            const foundItem = state.expenses.find(
                (item) => item.id === action.payload
            );

            state.totalAmount -= foundItem.price;

            state.expenses = state.expenses.filter(
                (item) => item.id !== action.payload
            );

            state.premium = state.totalAmount > 10000 ? true : false;
        },

        errorInExpense(state, action) {
            state.error = action.payload;
        },

        updateExpense(state, action) {
            const id = action.payload.id;
            const newItem = action.payload.newItem;

            const idx = state.expenses.findIndex(
                (item) => String(item.id) === String(id)
            );

            state.totalAmount =
                state.totalAmount + newItem.price - state.expenses[idx].price;

            state.expenses[idx] = { ...newItem, id: id };

            state.premium = state.totalAmount > 10000 ? true : false;
        },
    },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
