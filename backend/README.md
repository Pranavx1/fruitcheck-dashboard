
# SpectraVision Backend - Django Version

This is a Django application that simulates a backend for the SpectraVision project.
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

3. Run initial database migrations:
   ```
   python manage.py migrate
   ```

4. Create a superuser (optional, for admin access):
   ```
   python manage.py createsuperuser
   ```

5. Run the development server:
   ```
   python manage.py runserver 0.0.0.0:5000
   ```

The server will start on port 5000 to maintain compatibility with the frontend.

## API Endpoints

### POST /analyze/
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

### GET /healthcheck/
Returns a simple status message to verify the server is running.

Example response:
```json
{
  "status": "ok"
}
```

## Admin Interface

Django provides a built-in admin interface at `/admin/` where you can manage your application data.
You'll need to create a superuser first (see setup instructions above).

## Connecting with the Frontend

This backend is designed to work with the SpectraVision frontend. The API endpoints are compatible
with the existing frontend code. Make sure the backend is running on http://localhost:5000.
