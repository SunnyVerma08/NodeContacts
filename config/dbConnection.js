// Importing the Mongoose library
const mongoose = require('mongoose');

// Defining an asynchronous function to connect to the MongoDB database
const connectDb = async () => {
  try {
    // Retrieving the MongoDB connection string from the environment variables
    const { MONGODB_URI } = process.env;
    if (!MONGODB_URI) {
      throw new Error('MongoDB connection string not provided');
    }

    // Establishing the connection to the MongoDB database using the Mongoose library
    const connect = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // how long to wait for a connection to be established
      socketTimeoutMS: 45000, // how long to wait for a response from the server
    });

    // Logging the connection details if the connection is successful
    console.log(
      'Database connected:',
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    // Logging an error message and exiting the process if the connection fails
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
};

// Exporting the connectDb function for use in other files
module.exports = connectDb;
