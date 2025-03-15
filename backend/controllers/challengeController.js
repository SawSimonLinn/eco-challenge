const Challenge = require("../models/Challenge");

exports.getChallenges = async (req, res) => {
  try {
    const { goal, level } = req.query;

    if (!goal || !level) {
      return res
        .status(400)
        .json({ error: "Goal and experience level are required." });
    }

    const challengeData = await Challenge.findOne({ goal, level });

    if (!challengeData) {
      return res.status(404).json({ error: "No challenges found." });
    }

    res.json(challengeData.challenges); // Send only the challenges array
  } catch (error) {
    res.status(500).json({ error: "Error fetching challenges." });
  }
};

exports.addChallenge = async (req, res) => {
  try {
    const { goal, level, task } = req.body;
    const newChallenge = new Challenge({ goal, level, task });
    await newChallenge.save();
    res.json({ message: "Challenge added", challenge: newChallenge });
  } catch (error) {
    res.status(500).json({ error: "Error adding challenge." });
  }
};

exports.deleteChallenge = async (req, res) => {
  try {
    await Challenge.findByIdAndDelete(req.params.id);
    res.json({ message: "Challenge deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting challenge." });
  }
};
