const Challenge = require("../models/Challenge");

const loadChallenges = () => {
  if (!fs.existsSync(FILE_PATH)) return [];
  return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
};

exports.getChallenges = async (req, res) => {
  try {
    const { goal, level } = req.query;
    const challenges = loadChallenges();

    if (!goal || !level) {
      return res
        .status(400)
        .json({ error: "Goal and experience level are required." });
    }

    // const challengeData = await Challenge.findOne({ goal, level });
    const challengeData = challenges.find(
      (challenge) => challenge.goal === goal && challenge.level === level
    );

    if (!challengeData) {
      return res.status(404).json({ error: "No challenges found." });
    }

    res.json(challengeData.challenges);
  } catch (error) {
    res.status(500).json({ error: "Error fetching challenges." });
  }
};
