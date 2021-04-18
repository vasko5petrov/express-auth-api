import { SESSION_NAME } from "../configs/session";

export const logIn = (req, userId) => {
    req.session.userId = userId;
};

export const logOut = (req, res) => {
    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) reject(err);
            res.clearCookie(SESSION_NAME);
            resolve();
        })
    })
};

export const isLoggedIn = (req) => !!req.session.userId;