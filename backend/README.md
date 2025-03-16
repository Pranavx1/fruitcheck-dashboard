
# SpectraVision Backend Simulator

This is a simple Flask application that simulates a backend for the SpectraVision project. 
It provides an API endpoint that accepts image uploads and returns simulated classification results.

## Setup and Running

1. Create a virtual environment (recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the application:
   ```
   python app.py
   ```

The server will start on port 5000 by default.

## API Endpoints

### POST /analyze
Accepts a JSON payload with a base64-encoded image and returns a simulated quality analysis.

Example request:
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA..."
}
```

Example response:
```json
{
  "success": true,
  "result": "good",
  "confidence": 87.5
}
```

### GET /healthcheck
Returns a simple status message to verify the server is running.

Example response:
```json
{
  "status": "ok"
}
```

## Connecting with the Frontend

This backend is designed to work with the SpectraVision frontend. You'll need to:

1. Make sure the backend is running on http://localhost:5000
2. Update the frontend to send image data to the /analyze endpoint
3. Process the response to display the classification results
