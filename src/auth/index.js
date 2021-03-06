import { SESSION_NAME } from "../configs/session";

export const logIn = (req, userId) => {
    req.session.userId = userId;
    req.session.createdAt = Date.now();
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

export const markAsVerified = async (user) => {
    user.verifiedAt = Date.now();
    await user.save();
}

export const isLoggedIn = (req) => !!req.session.userId;