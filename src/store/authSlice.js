import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated: localStorage.getItem("token") ? true : false,
    token: localStorage.getItem("token"),
    isVerified: false,
    isProfileComplete: false,
};

const authSlice = createSlice({
    initialState: initialAuthState,
    name: "authentication",
    reducers: {
        login(state, action) {
            localStorage.setItem("token", action.payload);
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        logout(state) {
            localStorage.removeItem("token");
            state.isAuthenticated = false;
            state.token = null;
        },
        update(state, action) {
            state.isVerified = true;
            state.isProfileComplete = action.payload;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;
