const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc Get all contacts
// @route GET /api/contacts
// @access Private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc Create new contact
// @route POST /api/contacts
// @access Private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ error: 'All fields are mandatory.' });
    return;
  }
  // Add data validation for data types and formats of the input fields
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc Get contact by id
// @route GET /api/contacts/:id
// @access Private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ error: 'Contact not found' });
    return;
  }
  res.status(200).json(contact);
});

// @desc Update contact by id
// @route PUT /api/contacts/:id
// @access Private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ error: 'Contact not found' });
    return;
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403).json({
      error: "User doesn't have permission to update other user's contacts",
    });
    return;
  }
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ error: 'All fields are mandatory.' });
    return;
  }
  try {
    // Add error handling for the database operation
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// @desc Delete contact by id
// @route DELETE /api/contacts/:id
// @access Private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404).json({ error: 'Contact not found' });
    return;
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403).json({
      error: "User doesn't have permission to delete other user's contacts",
    });
    return;
  }
  try {
    // Add error handling for the database operation
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Contact removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
