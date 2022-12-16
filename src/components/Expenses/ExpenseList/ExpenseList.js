import React from "react";
import Expense from "./Expense";

const ExpenseList = (props) => {
    return (
        <div className="mw8 measure center ">
            {props.expenses.map((item) => {
                return (
                    <Expense
                        key={item.id}
                        price={item.price}
                        description={item.description}
                        category={item.category}
                    />
                );
            })}
        </div>
    );
};

export default ExpenseList;
