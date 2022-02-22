
from django.db import models
from django.utils.translation import gettext_lazy as _


from django.contrib.auth.models import AbstractUser,BaseUserManager


class User(AbstractUser):
    
    class ApplicationType(models.TextChoices):
        ADMIN = "ADMIN"
        INPUTER = "INPUTER"
        VIEWER = "VIEWER"

    username = models.CharField(_('username'),max_length=100,unique=True)
    user_type = models.CharField(_('User Type'),max_length=15, choices = ApplicationType.choices,default = ApplicationType.INPUTER)
    email = models.EmailField(_('email address'), unique=True,null=True,blank=True)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.username
    
