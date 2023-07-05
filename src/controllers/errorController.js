const AppError = require('../utils/appError');
const logger = require('./../utils/loger');
const handleCastError23505 = () =>
  new AppError('Duplicate field value: please use another value 👀', 400);
const sendErrorDev = (err, res) => {
  logger.info(err);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  logger.info(err);
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 🧨', err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (error.parent?.code === '23505') error = handleCastError23505();

    /* valid errors */

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
