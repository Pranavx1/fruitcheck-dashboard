
"""URL Configuration for the spectravision project."""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),  # Include the API app URLs
]
