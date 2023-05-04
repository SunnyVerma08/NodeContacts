// Import necessary dependencies
require('dotenv').config();
const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const contactRouter = require('./routes/contactRoutes');
const userRouter = require('./routes/userRoutes');

// Connect to the database and start the server
(async () => {
  await connectDb();
  const app = express();

  const port = process.env.PORT || 3000;

  // Use middleware to parse incoming requests as JSON
  app.use(express.json());

  // Use the contact and user routers for their respective routes
  app.use('/api/contacts', contactRouter);
  app.use('/api/users', userRouter);

  // Fallback route for any requests that do not match existing routes
  app.use('*', (req, res, next) => {
    const error = new Error('Route not found');
    error.statusCode = 404;
    next(error);
  });

  // Use custom error handling middleware for all errors
  app.use(errorHandler);

  // Start the server and log that it is running
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();
