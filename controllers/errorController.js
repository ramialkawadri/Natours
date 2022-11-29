const AppError = require('../utils/appError');

const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.log('Error: ', err);

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!',
        });
    }
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err,
    });
};

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;

    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value.`;

    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;

    return new AppError(message, 400);
};

const handleJWTError = () =>
    new AppError('Invalid token. Please login again!', 401);

const handleJWTExpired = () =>
    new AppError('Your token has expired! Please log in again!', 401);

module.exports = (err, req, res, next) => {
    err.statusCode ??= 500;
    err.status ??= 'error';

    if (process.env.NODE_ENV === 'development') sendErrorDev(err, res);
    else if (process.env.NODE_ENV === 'production ') {
        let error = Object.assign(err);

        if (error.name === 'CastError') error = handleCastErrorDB(error);

        if (error.code === 11000) error = handleDuplicateFieldsDB(error);

        if (error.name === 'ValidationError')
            error = handleValidationErrorDB(error);

        if (error.name === 'JsonWebTokenError') error = handleJWTError();

        if (error.name === 'TokenExpiredError') error = handleJWTExpired();

        sendErrorProd(error, res);
    }
};
