const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in .env file");
    }
    console.log('Connecting to MongoDB using:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI); // Removed deprecated options
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
