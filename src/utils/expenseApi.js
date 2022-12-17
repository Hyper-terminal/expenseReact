export const expenseAdd = async (item) => {
    const res = await fetch(
        "https://expensetracker-77f96-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json",
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        }
    );

    const data = await res.json();

    return { res, data };
};

export const expenseRemove = async (id) => {
    const res = await fetch(
        `https://expensetracker-77f96-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`,
        {
            method: "delete",
        }
    );

    const data = await res.json();

    return { res, data };
};

export const expenseUpdate = async (id, newItem) => {
    const res = await fetch(
        `https://expensetracker-77f96-default-rtdb.asia-southeast1.firebasedatabase.app/expenses/${id}.json`,
        {
            method: "put",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
        }
    );

    const data = await res.json();

    return { res, data };
};

export const getExpenses = async () => {
    const res = await fetch(
        "https://expensetracker-77f96-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
    );

    const data = await res.json();

    return { res, data };
};
