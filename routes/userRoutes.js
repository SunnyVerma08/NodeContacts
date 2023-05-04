// Require the Express package and the necessary controllers and middleware.
const express = require('express');
const {
  registerUser,
  loginUser,
  currentUser,
} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

// Create a new router instance with the Express package.
const router = express.Router();

// Define the HTTP routes with their respective controller functions.
router.post('/register', registerUser); // Handles user registration.
router.post('/login', loginUser); // Handles user login.
router.get('/current', validateToken, currentUser); // Handles retrieval of current user data.

// Export the router object so it can be used by the application.
module.exports = router;