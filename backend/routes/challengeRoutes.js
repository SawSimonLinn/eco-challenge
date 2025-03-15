const express = require("express");
const {
  getChallenges,
  addChallenge,
  deleteChallenge,
} = require("../controllers/challengeController");
const router = express.Router();

router.get("/", getChallenges);
router.post("/", addChallenge);
router.delete("/:id", deleteChallenge);

module.exports = router;
