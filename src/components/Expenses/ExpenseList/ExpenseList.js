import React from "react";
import Expense from "./Expense";

const ExpenseList = (props) => {
    return (
        <div className="mw8 measure center ">
            {props.expenses.map((item, index) => {
                console.log(item);

                return (
                    <Expense
                        key={index}
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
