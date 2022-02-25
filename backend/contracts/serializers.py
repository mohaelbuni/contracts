from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Contract
from django.contrib.auth import get_user_model

User = get_user_model()


class ContractSerializer(serializers.ModelSerializer):
    inputer_name = serializers.SerializerMethodField()
    class Meta:
        model = Contract
        fields = ('title','contract_number','pdf','id','vendor',
                  'start_date','end_date','duration','renewble','renewal_duration','cost',
                  'auth_status','type','description','contract_with','inputer','inputer_name','authorizor','department')

    def get_inputer_name(self, object):
        return str(object.inputer)




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
