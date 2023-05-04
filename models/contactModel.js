// Importing Mongoose library to work with MongoDB
const mongoose = require('mongoose');

// Creating a schema for the Contact model
const contactSchema = mongoose.Schema(
  {
    // Defining a field to store the user id
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // Defining a field to store the contact name
    name: {
      type: String,
      required: [true, 'Please add the contact name'],
    },
    // Defining a field to store the contact email address
    email: {
      type: String,
      required: [true, 'Please add the contact email address'],
    },
    // Defining a field to store the contact phone number
    phone: {
      type: String,
      required: [true, 'Please add the contact phone number'],
    },
  },
  // Setting options for the schema, including timestamps
  {
    timestamps: true,
  }
);

// Exporting the Contact model
module.exports = mongoose.model('Contact', contactSchema);