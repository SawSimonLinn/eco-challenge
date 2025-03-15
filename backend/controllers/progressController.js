const Progress = require("../models/Progress");

exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.params.userId });
    res.json(progress || { completedTasks: [] });
  } catch (error) {
    res.status(500).json({ error: "Error fetching progress." });
  }
};

exports.saveProgress = async (req, res) => {
  try {
    const { userId, completedTasks } = req.body;
    let progress = await Progress.findOne({ userId });

    if (!progress) {
      progress = new Progress({ userId, completedTasks });
    } else {
      progress.completedTasks = completedTasks;
    }

    await progress.save();
    res.json({ message: "Progress saved", progress });
  } catch (error) {
    res.status(500).json({ error: "Error saving progress." });
  }
};
