from flask import Flask, request, jsonify

# Initialize Flask app
app = Flask(__name__)

# Define the /predict route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse incoming JSON request
        data = request.get_json()

        # Extract parameters
        location = data.get('location', 'Unknown Location')
        crop = data.get('crop', 'Unknown Crop')

        # Simulated prediction logic
        if crop == "Rice":
            predicted_yield = 500 + hash(location) % 100  # Simulate yield for Rice
        elif crop == "Wheat":
            predicted_yield = 300 + hash(location) % 50  # Simulate yield for Wheat
        else:
            predicted_yield = 0  # Default for unknown crops

        # Return the prediction as a JSON response
        response = {
            "location": location,
            "crop": crop,
            "predicted_yield": f"{predicted_yield:.2f}"
        }
        return jsonify(response), 200

    except Exception as e:
        # Handle errors gracefully
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
