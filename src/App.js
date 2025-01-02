import React from "react";
import "./App.css";
import PredictionForm from "./components/PredictionForm"; // Import the PredictionForm component

function App() {
  // Function to generate stars
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 100; i++) {
      const style = {
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 10 + 5}s`,
        animationDelay: `${Math.random() * 5}s`,
      };
      stars.push(<div key={i} className="stars" style={style}></div>);
    }
    return stars;
  };

  return (
    <div className="App">
      {generateStars()} {/* Render the stars */}
      <header className="App-header">
        <h1>Agriculture Tool</h1>
        <p>Enter your location below to predict the crop yield:</p>
        <PredictionForm /> {/* Render the PredictionForm component */}
      </header>
    </div>
  );
}

export default App;
