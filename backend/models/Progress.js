const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completedTasks: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Progress", ProgressSchema);
