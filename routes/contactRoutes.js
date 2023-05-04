// Import required modules and controllers
const express = require('express');
const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

// Use middleware to validate token
router.use(validateToken);

// Define routes and HTTP methods
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An error occurred while processing the request',
    error: err.message,
  });
});

// Export router
module.exports = router;