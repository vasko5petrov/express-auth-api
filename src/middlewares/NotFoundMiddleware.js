import HttpException from '../exceptions/HttpException';

const NotFoundMiddleware = (req, res, next) => {
    next(new HttpException(404, "Route was not found"));
}

export default NotFoundMiddleware;