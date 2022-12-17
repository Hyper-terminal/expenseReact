export const signin = async (formData) => {
    const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                returnSecureToken: true,
            }),
        }
    );

    const data = await res.json();
    return { res, data };
};

export const signup = async (formData) => {
    const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API}`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                returnSecureToken: true,
            }),
        }
    );

    const data = await res.json();

    return { res, data };
};

export const passwordChange = async (email) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_API}`;

    const res = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            requestType: "PASSWORD_RESET",
        }),
    });

    const data = await res.json();

    return { res, data };
};

export const updateUserDetails = async (idToken, picUrl, fullName) => {
    const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API}`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                returnSecureToken: true,
                idToken: idToken,
                displayName: fullName,
                photoUrl: picUrl,
            }),
        }
    );

    const data = await res.json();

    return { res, data };
};

export const emailVerification = async (idToken) => {
    const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_API}`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: idToken,
            }),
        }
    );

    const data = await res.json();

    return { res, data };
};

export const getDetails = async (token) => {
    const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_API}`,
        {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idToken: token,
            }),
        }
    );

    const data = await res.json();
    return { res, data };
};
