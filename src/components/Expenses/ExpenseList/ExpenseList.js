import React, { useContext } from "react";
import ExpenseContext from "../../../store/expense-context";
import Expense from "./Expense";

const ExpenseList = () => {
    const expenseCtx = useContext(ExpenseContext);
    return (
        <div className="mw8 measure center ">
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
