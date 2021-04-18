import HttpException from '../exceptions/HttpException';
import jwt from 'jsonwebtoken';
import { isLoggedIn } from '../auth';

export const quest = (req, res, next) => {
    if(isLoggedIn(req)) {
        return next(new HttpException(403, 'You are logged in'));
    }

    next();
};

export const IsAuthenticated = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    try {
        req.user = await jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        return next(new HttpException(403, err.message));
    }
};