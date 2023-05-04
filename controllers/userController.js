// Import necessary modules and models
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// @desc Register a user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all required fields are provided
  if (!username || !email || !password) {
    res.status(400).json({ error: 'All fields are mandatory!' });
    return;
  }

  // Check if user with provided email already exists
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json({ error: 'User already registered!' });
    return;
  }

  try {
    // Hash password and create user in database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(`User created ${user}`);
    res.status(201).json({ _id: user.id, email: user.email });
  } catch (err) {
    // Handle database errors
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    res.status(400).json({ error: 'All fields are mandatory!' });
    return;
  }

  // Find user by email and compare password hash
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    // If password is correct, create a JWT and send it to client
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    res.status(200).json({ accessToken });
  } else {
    // If email or password is not valid, return error
    res.status(401).json({ error: 'Email or password is not valid' });
  }
});

// @desc Get current user info
// @route GET /api/users/current
// @access Private
const currentUser = asyncHandler(async (req, res) => {
  // Return current user info
  res.json(req.user);
});

// Export functions to be used in other parts of the application
module.exports = { registerUser, loginUser, currentUser };
