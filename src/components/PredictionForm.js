import React, { useState } from "react";

function PredictionForm() {
  const [location, setLocation] = useState("");
  const [crop, setCrop] = useState("Rice");
  const [predictedYield, setPredictedYield] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleCropChange = (e) => {
    setCrop(e.target.value);
  };

  const handlePredictClick = () => {
    fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location, crop }), // Send location and crop to backend
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch prediction");
        }
        return response.json();
      })
      .then((data) => {
        setPredictedYield(data.predicted_yield); // Update the frontend state with the Python response
      })
      .catch((error) => {
        console.error("Error fetching prediction:", error);
        alert("Failed to fetch prediction. Please try again.");
      });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>Select Crop:</strong>
          <select
            value={crop}
            onChange={handleCropChange}
            style={{
              display: "block",
              width: "80%",
              margin: "10px auto",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          >
            <option value="Rice">Rice</option>
            <option value="Wheat" disabled>
              Wheat (Coming Soon)
            </option>
          </select>
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          <strong>Enter Location:</strong>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="e.g., Punjab, India"
            style={{
              display: "block",
              width: "80%",
              margin: "10px auto",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />
        </label>
      </div>

      <button
        onClick={handlePredictClick}
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Predict Yield
      </button>

      {predictedYield && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid rgba(255, 255, 255, 0.5)", // Transparent border
            borderRadius: "5px",
            backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent background
            backdropFilter: "blur(5px)", // Adds a blur effect
            color: "#fff", // White text
          }}
        >
          <h3 style={{ color: "#4CAF50", textShadow: "1px 1px 2px #000" }}>
            Predicted Yield
          </h3>
          <p>
            <strong>Crop:</strong> {crop}
          </p>
          <p>
            <strong>Location:</strong> {location || "Unknown"}
          </p>
          <p>
            <strong>Predicted Yield:</strong> {predictedYield} kg/ha
          </p>
        </div>
      )}
    </div>
  );
}

export default PredictionForm;
