import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./store/AuthProvider";
import ExpenseProvider from "./store/ExpenseProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthProvider>
        <ExpenseProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ExpenseProvider>
    </AuthProvider>
);
