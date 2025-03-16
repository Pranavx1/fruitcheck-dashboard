
import base64
import json
import logging
import random
import time
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@csrf_exempt  # Disable CSRF for this POST endpoint
@require_http_methods(["POST"])
def analyze_image(request):
    """
    Endpoint to analyze uploaded images.
    Expects a base64 encoded image in the request JSON.
    Returns a simulated analysis result.
    """
    try:
        # Get the image from the request
        data = json.loads(request.body)
        if not data or 'image' not in data:
            return JsonResponse({'error': 'No image data provided'}, status=400)
        
        # The image is sent as base64 string
        image_data = data['image']
        if not image_data.startswith('data:image'):
            return JsonResponse({'error': 'Invalid image format'}, status=400)
        
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
        return JsonResponse({
            'success': True,
            'result': result,
            'confidence': confidence
        })
    
    except Exception as e:
        logger.error(f"Error processing image: {str(e)}")
        return JsonResponse({'error': f'Error processing image: {str(e)}'}, status=500)

@require_http_methods(["GET"])
def healthcheck(request):
    """Simple endpoint to check if the server is running"""
    return JsonResponse({'status': 'ok'})
