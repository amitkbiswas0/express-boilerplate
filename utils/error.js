require("dotenv").config();
const logger = require("./logger");

// base errorhandler class, can be extended for specific errors
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // prevents the class from appearing in error stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

// for production, output clean and generic
const sendErrorProd = (err, res) => {
  // log error to error.log file
  logger.error(err);

  if (err.isOperational) {
    // Operational, trusted error: send message to client
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other unknown error
    console.error("ERROR : ", err);
    res.status(500).json({
      status: "error",
      message: "SOMETHING WENT WRONG!",
    });
  }
};

// for development, as much details as possible
const sendErrorDev = (err, res) => {
  // show log to console
  logger.error(err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// catch all errors and handle accordingly
const catchError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "production") sendErrorProd(err, res);
  else if (process.env.NODE_ENV === "development") sendErrorDev(err, res);
};

module.exports = {
  ErrorHandler,
  catchError,
};
