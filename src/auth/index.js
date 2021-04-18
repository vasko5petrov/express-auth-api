export const login = (req, userId) => {
    req.session.userId = userId;
};

export const isLoggedIn = (req) => !!req.session.userId;