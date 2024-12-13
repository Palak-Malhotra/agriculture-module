import React, { useState } from "react";

const regionalDefaults = {
  Punjab: { ndvi: 0.75, rainfall: 300, soil_pH: 6.5 },
  Haryana: { ndvi: 0.7, rainfall: 250, soil_pH: 6.8 },
};

const PredictionForm = () => {
  const [inputs, setInputs] = useState({
    crop: "",
    region: "",
    season: "",
    ndvi: "",
    rainfall: "",
    soil_pH: "",
  });
  const [result, setResult] = useState(null);

  const handleRegionChange = (e) => {
    const selectedRegion = e.target.value;
    const defaults = regionalDefaults[selectedRegion] || {};
    setInputs({
      ...inputs,
      region: selectedRegion,
      ndvi: defaults.ndvi || "",
      rainfall: defaults.rainfall || "",
      soil_pH: defaults.soil_pH || "",
    });
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Placeholder API call (update with your actual API endpoint)
    const response = await fetch("http://<your-api-url>/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });
    const data = await response.json();
    setResult(data.predicted_yield);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {/* Row for Crop, Region, and Season */}
        <div className="form-row">
          <label>
            Crop:
            <select
              name="crop"
              value={inputs.crop}
              onChange={handleChange}
              required
            >
              <option value="">Select Crop</option>
              <option value="Rice">Rice</option>
              <option value="Wheat">Wheat</option>
            </select>
          </label>
          <label>
            Region:
            <select
              name="region"
              value={inputs.region}
              onChange={handleRegionChange}
              required
            >
              <option value="">Select Region</option>
              <option value="Punjab">Punjab</option>
              <option value="Haryana">Haryana</option>
            </select>
          </label>
          <label>
            Season:
            <select
              name="season"
              value={inputs.season}
              onChange={handleChange}
              required
            >
              <option value="">Select Season</option>
              <option value="Kharif">Kharif</option>
              <option value="Rabi">Rabi</option>
            </select>
          </label>
        </div>

        {/* Row for NDVI, Rainfall, and Soil pH */}
        <div className="form-row">
          <label>
            NDVI:
            <input
              type="number"
              name="ndvi"
              placeholder="e.g., 0.75"
              value={inputs.ndvi}
              onChange={handleChange}
              step="0.01"
              required
            />
          </label>
          <label>
            Rainfall (mm):
            <input
              type="number"
              name="rainfall"
              placeholder="e.g., 300"
              value={inputs.rainfall}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Soil pH:
            <input
              type="number"
              name="soil_pH"
              placeholder="e.g., 6.5"
              value={inputs.soil_pH}
              onChange={handleChange}
              step="0.1"
              required
            />
          </label>
        </div>

        {/* File Upload */}
        <div className="form-row">
          <label>
            Upload Soil Report (Optional):
            <input type="file" name="soil_report" />
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit">Predict Yield</button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="result-container">
          <h3>Predicted Yield:</h3>
          <p>{result} kg/ha</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
