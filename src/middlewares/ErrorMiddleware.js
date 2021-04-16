const ErrorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Server error.";
    
    res.status(status).send({status, message})
}

export default ErrorMiddleware;