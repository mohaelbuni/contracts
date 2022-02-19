from email import message
from django.db import models
from django.dispatch import receiver

# Create your models here.


class Alert(models.Model):
    message = models.TextField()
    subject = models.CharField(max_length=255)
    sender = models.EmailField()  # LibankContractEmail@lib.com.ly
    receiver = models.EmailField() # AdminEmail@lib.com.ly
    
    def __str__(self):
        return self.subject