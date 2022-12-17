import React, { useContext } from "react";
import ExpenseContext from "../../../store/expense-context";
import Expense from "./Expense";

const ExpenseList = () => {
    const expenseCtx = useContext(ExpenseContext);
    return (
        <div className="mw8 br4 mt3 bg-black-40 pa3 shadow-3 w-75  center  ">
            <h1 className="tc">Total: 5000</h1>

                {expenseCtx.expenses.map((item) => {
                    return (
                        <Expense
                            key={item.id}
                            price={item.price}
                            description={item.description}
                            category={item.category}
                            id={item.id}
                        />
                    );
                })}
        </div>
    );
};

export default ExpenseList;
