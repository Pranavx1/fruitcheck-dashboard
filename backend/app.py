
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import random
import time
import os
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/analyze', methods=['POST'])
def analyze_image():
    """
    Endpoint to analyze uploaded images.
    Expects a base64 encoded image in the request JSON.
    Returns a simulated analysis result.
    """
    try:
        # Get the image from the request
        data = request.json
        if not data or 'image' not in data:
            return jsonify({'error': 'No image data provided'}), 400
        
        # The image is sent as base64 string
        image_data = data['image']
        if not image_data.startswith('data:image'):
            return jsonify({'error': 'Invalid image format'}), 400
        
        # Log the request
        logger.info(f"Received image analysis request: {len(image_data)} bytes")
        
        # Simulate processing time
        time.sleep(2)
        
        # Simulate ML model prediction
        # In a real scenario, you would load your CNN model here and process the image
        result = 'good' if random.random() > 0.5 else 'bad'
        confidence = 70 + random.random() * 25  # Random confidence between 70-95%
        
        logger.info(f"Analysis complete: Result = {result}, Confidence = {confidence:.2f}%")
        
        # Return the result
        return jsonify({
            'success': True,
            'result': result,
            'confidence': confidence
        })
    
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}")
        return jsonify({'error': f'Error processing image: {str(e)}'}), 500

@app.route('/healthcheck', methods=['GET'])
def healthcheck():
    """Simple endpoint to check if the server is running"""
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
