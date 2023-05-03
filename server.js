require('dotenv').config();
const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const contactRouter = require('./routes/contactRoutes');
const userRouter = require('./routes/userRoutes');

(async () => {
  await connectDb();
  const app = express();

  const port = process.env.PORT || 3000;

  app.use(express.json());

  app.use('/api/contacts', contactRouter);
  app.use('/api/users', userRouter);

  // Fallback route
  app.use('*', (req, res, next) => {
    const error = new Error('Route not found');
    error.statusCode = 404;
    next(error);
  });

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();
