const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/inotebook"; // Add your database name

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectToMongo;
