import React from "react";
import { useSelector } from "react-redux";
import Expense from "./Expense";

const ExpenseList = () => {
    const expenses = useSelector((state) => state.expense.expenses);
    const totalAmount = useSelector((state) => state.expense.totalAmount);

    return (
        <div className="mw8 br4 mt3 bg-black-40 pa3 shadow-3 w-75  center  ">
            <h1 className="tc">Total: {totalAmount}</h1>

            {expenses.map((item) => {
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
