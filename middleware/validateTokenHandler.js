// This code defines a middleware function called validateToken which will check if a user is authorized to access a protected route.
// It uses the express-async-handler package to handle any errors that may occur during the asynchronous execution of this function.
// It also uses the jsonwebtoken package to verify the authenticity of the access token passed in the request headers.
// If the token is invalid or missing, an error will be thrown and the request will be stopped.
// If the token is valid, the user object will be decoded and attached to the request object for further use by downstream middleware or route handlers.

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }
  if (!token) {
    res.status(401);
    throw new Error('User is not authorized or token is missing.');
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401);
    throw new Error('User is not authorized or token is invalid.');
  }
});

module.exports = validateToken;
