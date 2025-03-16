const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB Connected".green.bold);
  } catch (error) {
    //  give error message in red
    console.error("MongoDB Connection Error:".red.bold, error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
