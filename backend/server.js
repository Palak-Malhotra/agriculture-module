const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON requests

// Prediction Endpoint
app.post("/api/predict", async (req, res) => {
  const { location, crop } = req.body;

  // Validate input
  if (!location || !crop) {
    return res.status(400).json({ error: "Location and crop are required." });
  }

  console.log(`Prediction request received for location: ${location}, crop: ${crop}`);

  try {
    // Call Python API
    console.log(`Sending request to Python API with data: ${JSON.stringify({ location, crop })}`);
    const response = await axios.post("http://127.0.0.1:5001/predict", { location, crop });
    res.json(response.data); // Forward Python API response to the frontend
  } catch (error) {
    console.error("Error calling Python API:", error.message);
    res.status(500).json({ error: "Failed to fetch prediction from Python API" });
  }
});

// Root endpoint for testing
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
