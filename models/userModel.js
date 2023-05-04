// Require the mongoose package and the validator package
const mongoose = require('mongoose');
const validator = require('validator');

// Create a new mongoose schema for user with username, email, and password fields
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add the user name'], // Ensure username is required and add a custom error message
    },
    email: {
      type: String,
      required: [true, 'Please add the email address'], // Ensure email is required and add a custom error message
      unique: [true, 'Email address already taken'], // Ensure email is unique and add a custom error message
      validate: {
        validator: validator.isEmail, // Use the validator package to check if the email is valid
        message: 'Please enter a valid email address', // Add a custom error message if the email is not valid
      },
    },
    password: {
      type: String,
      required: [true, 'Please add the user password'], // Ensure password is required and add a custom error message
    },
  },
  {
    timestamps: true, // Add timestamps to the schema
  }
);

// Export the user schema as a mongoose model named 'User'
module.exports = mongoose.model('User', userSchema);