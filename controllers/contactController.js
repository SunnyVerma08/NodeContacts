const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc Get all contacts
// @route GET /api/contacts
// @access Private
const getContacts = asyncHandler(async (req, res) => {
  // Retrieve all contacts that belong to the authenticated user
  const contacts = await Contact.find({ user_id: req.user.id });
  // Send the contacts as a JSON response with a 200 status code
  res.status(200).json(contacts);
});

// @desc Create new contact
// @route POST /api/contacts
// @access Private
const createContact = asyncHandler(async (req, res) => {
  // Retrieve the name, email, and phone from the request body
  const { name, email, phone } = req.body;
  // Check that all fields are present in the request body
  if (!name || !email || !phone) {
    // If any fields are missing, send a 400 response with an error message
    res.status(400).json({ error: 'All fields are mandatory.' });
    return;
  }
  // Create a new contact with the specified data and the user ID of the authenticated user
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  // Send the new contact as a JSON response with a 201 status code
  res.status(201).json(contact);
});

// @desc Get contact by id
// @route GET /api/contacts/:id
// @access Private
const getContact = asyncHandler(async (req, res) => {
  // Find the contact with the specified ID
  const contact = await Contact.findById(req.params.id);
  // If the contact does not exist, send a 404 response with an error message
  if (!contact) {
    res.status(404).json({ error: 'Contact not found' });
    return;
  }
  // Send the contact as a JSON response with a 200 status code
  res.status(200).json(contact);
});

// @desc Update contact by id
// @route PUT /api/contacts/:id
// @access Private
const updateContact = asyncHandler(async (req, res) => {
  // Find the contact with the specified ID
  const contact = await Contact.findById(req.params.id);
  // If the contact does not exist, send a 404 response with an error message
  if (!contact) {
    res.status(404).json({ error: 'Contact not found' });
    return;
  }
  // Check that the authenticated user owns the contact
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403).json({
      error: "User doesn't have permission to update other user's contacts",
    });
    return;
  }
  // Retrieve the name, email, and phone from the request body
  const { name, email, phone } = req.body;
  // Check that all fields are present in the request body
  if (!name || !email || !phone) {
    // If any fields are missing, send a 400 response with an error message
    res.status(400).json({ error: 'All fields are mandatory.' });
    return;
  }
  try {
    // Update the contact with the specified data and send the updated contact as a JSON response with a 200 status code
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );
    res.status(200).json(updatedContact);
  } catch (err) {
    // If there was an error updating the contact, send a 500 response with an error message
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// @desc Delete contact by id
// @route DELETE /api/contacts/:id
// @access Private
const deleteContact = asyncHandler(async (req, res) => {
  // Find the contact with the specified ID
  const contact = await Contact.findById(req.params.id);
  // If the contact does not exist, send a 404 response with an error message
  if (!contact) {
    res.status(404).json({ error: 'Contact not found' });
    return;
  }
  // Check that the authenticated user owns the contact
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403).json({
      error: "User doesn't have permission to delete other user's contacts",
    });
    return;
  }
  try {
    // Delete the contact and send a 200 response with a success message
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Contact removed' });
  } catch (err) {
    // If there was an error deleting the contact, send a 500 response with an error message
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// Export the functions for use in other modules
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

