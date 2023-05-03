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
