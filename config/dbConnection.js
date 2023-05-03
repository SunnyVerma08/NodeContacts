const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const { MONGODB_URI } = process.env;
    if (!MONGODB_URI) {
      throw new Error('MongoDB connection string not provided');
    }

    const connect = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // how long to wait for a connection to be established
      socketTimeoutMS: 45000, // how long to wait for a response from the server
    });

    console.log(
      'Database connected:',
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDb;
