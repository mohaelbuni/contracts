from django.db import models
from users.models import User
from django.utils.translation import gettext_lazy as _


# Create your models here.


class Department(models.Model):
    name = models.CharField(max_length=250)
    code = models.CharField(max_length=150)
    
    def __str__(self):
        return self.name


class Contract(models.Model):
    title = models.CharField(_('Title'),max_length=150)
    contract_number = models.CharField(_('Contract Number'),max_length=255)
    image = models.ImageField(_('Image'),upload_to='image/')
    vendor = models.CharField(_('Vendor'),max_length=150)
    department = models.ManyToManyField(Department,blank=True)
    start_date = models.DateField(_('Start Date'))
    end_date = models.DateField(_('End Date'))
    duration = models.IntegerField(_('Duration'))
    renewble = models.BooleanField(_('Renewble'))
    renewal_duration = models.IntegerField(_('Renewal Duration '))
    cost = models.FloatField(_('Cost'))
    inputer = models.ForeignKey(User,on_delete=models.DO_NOTHING)
    authorizor = models.ForeignKey(User,on_delete=models.DO_NOTHING,related_name='authorizor',null=True,blank=True)
    auth_status = models.BooleanField(_('Auth Status'),max_length=150,default=False)
    type = models.CharField(_('Contract Type'),max_length=150)
    description = models.TextField(_('Description'),)
    contract_with = models.CharField(_('Contract With'),max_length=150)
    created_at = models.DateField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    


