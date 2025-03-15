const mongoose = require("mongoose");

const ChallengeSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true,
    trim: true,
  },
  level: {
    type: String,
    required: true,
    enum: ["easy", "medium", "hard"],
    default: "easy",
  },
  task: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Challenge", ChallengeSchema);
