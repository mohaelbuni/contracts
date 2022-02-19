# code
from django.db.models.signals import pre_save

from django.dispatch import receiver

from django.contrib.auth import get_user_model

User = get_user_model()
 
 
@receiver(pre_save, sender=User)
def create(sender, instance, **kwargs):
    if instance.is_staff == True:
        instance.user_type = 'ADMIN'
        User.objects.filter(username = instance.id).update(user_type=instance.user_type)


pre_save.connect(create, sender=User)