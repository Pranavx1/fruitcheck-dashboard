
from django.urls import path
from . import views

urlpatterns = [
    path('analyze/', views.analyze_image, name='analyze_image'),
    path('healthcheck/', views.healthcheck, name='healthcheck'),
]
