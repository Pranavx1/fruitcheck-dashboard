
from django.db import models

# Create your models here.
# You can define data models here if needed for your application
# For example, you might want to store analysis results:

class AnalysisResult(models.Model):
    image_hash = models.CharField(max_length=64, unique=True)
    result = models.CharField(max_length=10)  # 'good' or 'bad'
    confidence = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.result} ({self.confidence:.2f}%)"
