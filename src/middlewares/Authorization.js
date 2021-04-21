import HttpException from '../exceptions/HttpException';
import { isLoggedIn, logOut } from '../auth';
import { SESSION_ABSOLUTE_TIMEOUT } from '../configs/session';

export const quest = (req, res, next) => {
    if(isLoggedIn(req)) {
        return next(new HttpException(400, 'You are already logged in'));
    }

    next();
};

export const auth = (req, res, next) => {
    if(!isLoggedIn(req)) {
        return next(new HttpException(401, 'You must be logged in'));
    }

    next();
};

export const active = async (req, res, next) => {
    if(isLoggedIn(req)) {
        const now = Date.now();
        const { createdAt } = req.session;

        if(now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
            await logOut(req, res);
            return next(new HttpException(401, 'Session expired'));
        }
    }

    next();
}