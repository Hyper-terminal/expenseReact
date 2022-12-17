import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expenseSlice from "./expenseSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        expense: expenseSlice.reducer,
    },
});

export default store;
