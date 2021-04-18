import HttpException from '../exceptions/HttpException';
import { isLoggedIn } from '../auth';

export const quest = (req, res, next) => {
    if(isLoggedIn(req)) {
        return next(new HttpException(403, 'You are already logged in'));
    }

    next();
};

export const auth = (req, res, next) => {
    if(!isLoggedIn(req)) {
        return next(new HttpException(403, 'You must be logged in'));
    }

    next();
};