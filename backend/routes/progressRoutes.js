const express = require("express");
const {
  getProgress,
  saveProgress,
} = require("../controllers/progressController");
const router = express.Router();

router.get("/:userId", getProgress);
router.post("/", saveProgress);

module.exports = router;
