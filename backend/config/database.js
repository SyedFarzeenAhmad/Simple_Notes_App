const mongoose = require('mongoose');
const { DATABASE_CONFIG } = require('../constants');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/notesapp',
      DATABASE_CONFIG.CONNECTION_OPTIONS
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
