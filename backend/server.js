const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const fs = require("fs");
const path = require("path");
const colors = require("colors");

const app = express();
const PORT = process.env.PORT || 5501;

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to Database
connectDB();

app.use(cors());
app.use(express.json());

// Middleware to serve static files (HTML, CSS, JS)
app.use(express.static("public"));
app.use(express.json());

// Load challenge data from JSON file
const dataPath = path.join(__dirname, "_data/challenges.json");
let challengeData = [];
try {
  challengeData = JSON.parse(fs.readFileSync(dataPath, "utf8"));
} catch (error) {
  console.error("Error reading challenges.json:", error);
  challengeData = [];
}

// API to get challenges
app.get("/api/challenges", (req, res) => {
  res.json(challengeData);
});

// Routes
app.use("/api/challenges", require("./routes/challengeRoutes"));
app.use("/api/progress", require("./routes/progressRoutes"));

app.get("/", (req, res) => res.send("Eco Challenge API is running!"));

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`.cyan.bold)
);
