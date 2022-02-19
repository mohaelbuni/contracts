from asyncio.windows_events import NULL
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Contract, Department
from .serializers import ContractSerializer
from django.http import Http404
from rest_framework import status
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from django.conf import settings
from users.models import User
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework import permissions
import json


@api_view(['GET'])
def sendEmail(request):
    if request.method == 'GET':
        email=EmailMessage(
            'Contracts System Alert Message Test',
            'Here is the test message.',
            settings.EMAIL_HOST_USER,
            ['s.younes@lib.com.ly','m.rehab@lib.com.ly']
        )
        email.fail_silently=False
        email.send()
        return Response({'send':'success'})
    
@api_view(['GET'])
def getData(request):
    if request.method == 'GET':
        contracts = Contract.objects.all()
        serializer = ContractSerializer(contracts,many=True)

        return Response(serializer.data)

        
@api_view(['POST'])
def saveData(request):
    data=request.POST
    images = request.FILES['image']
    print(request.data)
    if request.method == 'POST':
        user = User.objects.get(id=data['inputer'])
        contract = Contract.objects.create(
            title=data['title'],
            image=images,
            vendor=data['vendor'],
            start_date=data['start_date'],
            end_date=data['end_date'],
            duration=data['duration'],
            renewble=data['renewble'],
            renewal_duration=data['renewal_duration'],
            cost=data['cost'],
            inputer=user,
            authorizor=None,
            auth_status=data['auth_status'],
            type=data['type'],
            description=data['description'],
            contract_with=data['contract_with'],
            )
        contract.department.set(data['department'])
        print(contract)
        contract.save()
        serializer = ContractSerializer(contract,many=False)

        return Response(serializer.data)


class UploadTest(APIView):

    def post(self,request):
        data=request.data
        images=request.FILES['image']
        if data['renewble'] == 'true':
            state = True
        else:
            state=False
        user=User.objects.get(pk=int(data['inputer']))
        contract=Contract.objects.create(
            title=data['title'],
            image=images,
            vendor=data['vendor'],
            start_date=data['start_date'],
            end_date=data['end_date'],
            duration=data['duration'],
            renewble=state,
            renewal_duration=data['renewal_duration'],
            cost=data['cost'],
            inputer=user,
            type=data['type'],
            description=data['description'],
            contract_with=data['contract_with'],
        )
        contract.department.set(json.loads(data['department']))
        contract.save()
        serializer = ContractSerializer(contract,many=False)
        return Response(serializer.data)
        
 
        
        
        

    
    
    
    
# @api_view(['GET'])
# def get_company(request,code):
#     if request.method == 'GET':
#         company = Company.objects.get(code=str(code)) 
#         otps = OTP.objects.filter(company_code=company.id)
#         serializer = OTPSerializer(otps, many=True)
#         return Response(serializer.data)



# # Get all otp from database
# # POST create new otp in database
# @api_view(['GET', 'POST'])
# def get_OTPs(request):
#     if request.method == 'GET':
#         otps = OTP.objects.all()
#         serializer = OTPSerializer(otps, many=True)
#         return Response(serializer.data)
#     if request.method == 'POST':
#         try:
#             go = OTP.objects.get(barcode=request.data['barcode'])
#             return Response({"message": "barcode already exists"},
#                             status=status.HTTP_403_FORBIDDEN)
#         except OTP.DoesNotExist:
#             code = Company.objects.get(code=request.data['company_code'])
#             data = OTP(barcode=request.data['barcode'],
#                        recipent_name=request.data['recipent_name'],
#                        company_code=code)
#             data.save()
#             return Response({"save": "success"}, status=status.HTTP_200_OK)


# # GET -> search otp by barcode


# @api_view(['GET'])
# def get_OTPByBarcode(request, barcode):
#     if request.method == 'GET':
#         try:
#             obj = OTP.objects.get(barcode=int(barcode))
#             serializer = OTPSerializer(obj, many=False)
#             return Response(serializer.data)
#         except OTP.DoesNotExist:
#             return Response({'message': 'Barcode does not exist'},
#                             status.HTTP_404_NOT_FOUND)
