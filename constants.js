// This exports an object containing constant values for HTTP status codes
exports.constants = {
  VALIDATION_ERROR: 400, // A validation error occurred (e.g., missing or invalid data)
  UNAUTHORIZED: 401, // The user is not authorized to access the requested resource
  FORBIDDEN: 403, // The user is forbidden from accessing the requested resource
  NOT_FOUND: 404, // The requested resource could not be found
  SERVER_ERROR: 500, // There was a server error while processing the request
};
