const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 404)
};

// const handleDuplicateFieldsDB = err => {
//     const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

//     const message = `Duplicate field value: x. Please use another value!`;
//     return new AppError(message, 400);
// }

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    if(err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });

    // Programming or other unknown error: don't leak details to client
    } else {
        console.error('ERROR, err');

        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
       sendErrorDev(err, res)
    } else if (process.env.NODE_ENV === 'production') {
        let error = {...err};

        if(error.name === 'CastError') error = handleCastErrorDB(error)

        sendErrorProd(error, res)
    };
};