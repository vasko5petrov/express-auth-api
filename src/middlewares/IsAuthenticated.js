import jwt from 'jsonwebtoken';
import HttpException from '../exceptions/HttpException';

const IsAuthenticated = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    try {
        req.user = await jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        return next(new HttpException(403, err.message));
    }
};

export default IsAuthenticated;