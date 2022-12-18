// step 2(c): create theme reducer slice.

import { createSlice } from "@reduxjs/toolkit";

const initialThemeSlice = { theme: "dark_mode" };

const themeSlice = createSlice({
    name: "theme",
    initialState: initialThemeSlice,
    reducers: {
        forPremium(state) {
            state.theme = "dark_mode";
        },
        forNormal(state) {
            state.theme = null;
        },
    },
});

export const themeActions = themeSlice.actions;
export default themeSlice;
