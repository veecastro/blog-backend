export const errorResponseHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 400;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

//undefined routes
export const invalidRouteHandler = (req, res, next) => {
    let error = new Error('Invalid Path');
    error.status = 404;
    next(error);
};
