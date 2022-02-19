from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import Contract


class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = ('title','contract_number','image','id','vendor',
                  'start_date','end_date','duration','renewble','renewal_duration','cost',
                  'auth_status','type','description','contract_with','inputer','authorizor','department')

    #     "auth_status": false,
    #     "type": "yearly",
    #     "description": "this is T24 core banking system",
    #     "contract_with": "Temenos",
    #     "inputer": 1,
    #     "authorizor": null,
    #     "department"

# class OTPSerializer(serializers.ModelSerializer):
#     branch = serializers.SerializerMethodField()

#     class Meta:
#         model = OTP
#         fields = '__all__'

#     def get_branch(self, object):
#         print(object.company_code)

#         return str(object.company_code)
    
    
# class OTPsSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = OTP
#         fields = '__all__'
