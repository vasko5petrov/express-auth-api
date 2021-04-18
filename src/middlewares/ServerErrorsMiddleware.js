import HttpException from '../exceptions/HttpException';

export const ErrorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Server error.";
    
    res.status(status).json({status, message})
}

export const NotFoundMiddleware = (req, res, next) => {
    next(new HttpException(404, "Route was not found"));
}
