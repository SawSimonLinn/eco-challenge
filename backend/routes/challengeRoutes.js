const express = require("express");
const { getChallenges } = require("../controllers/challengeController");

const router = express.Router();

// Routes
router.get("/", getChallenges);

module.exports = router;
