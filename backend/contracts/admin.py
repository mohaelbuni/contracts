from django.contrib import admin
# from .models import OTP,Company,OTPProxy
# from import_export.admin import ImportExportModelAdmin
from . import models

from import_export.admin import ImportExportModelAdmin
from import_export import resources


class ContractResource(resources.ModelResource):

    class Meta:
        model = models.Contract
        
class ContractAdmin(ImportExportModelAdmin):
    resource_class = ContractResource

admin.site.register(models.Contract, ContractAdmin)
admin.site.register(models.Department)















# class OTPAdmin(admin.ModelAdmin):
#     list_filter=('recipent_name','company_code','barcode',)
#     list_display=('barcode','recipent_name','company_code')


# @admin.register(OTPProxy,Company)
# class ViewAdmin(ImportExportModelAdmin):
#     pass

# @admin.register(OTP)
# class OTPProxyAdmin(admin.ModelAdmin):
#     list_filter=('company_code','date')
#     list_display=('barcode','recipent_name','company_code','date')








