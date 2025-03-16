
import json
import random
import time
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

@csrf_exempt
@require_http_methods(["POST"])
def analyze_image(request):
    """
    Simple endpoint to analyze uploaded images.
    Expects a base64 encoded image in the request JSON.
    Returns a simulated analysis result.
    """
    try:
        # Get the image from the request
        data = json.loads(request.body)
        if not data or 'image' not in data:
            return JsonResponse({'error': 'No image provided'}, status=400)
        
        # Simulate processing time (2 seconds)
        time.sleep(2)
        
        # Simulate a random result
        result = 'good' if random.random() > 0.5 else 'bad'
        confidence = 70 + random.random() * 25  # Random confidence between 70-95%
        
        # Return the result
        return JsonResponse({
            'success': True,
            'result': result,
            'confidence': confidence
        })
    
    except Exception as e:
        return JsonResponse({'error': f'Error: {str(e)}'}, status=500)

@require_http_methods(["GET"])
def healthcheck(request):
    """Simple endpoint to check if the server is running"""
    return JsonResponse({'status': 'ok'})
