// This code exports a middleware function that handles errors in an Express app.
// It takes four parameters: err, req, res, and next.
// It checks the error's status code, and based on that, sends a response to the client with a JSON object containing an error message, a message with a stack trace, and the error's message.
// If the error does not have a status code, it defaults to 500 (server error).
// Finally, it calls the next middleware with the error.
const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode);
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        error: 'Validation error',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        error: 'Not found',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        error: 'Unauthorized',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.FORBIDDEN:
      res.json({
        error: 'Forbidden',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      res.json({
        error: 'Server error',
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
  next(err);
};

module.exports = errorHandler;
