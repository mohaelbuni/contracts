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


class Contracts(APIView):
    # parser_classes = [MultiPartParser,FormParser]

    '''Get all contracts'''  
    def get(self,request):
        if request.method == 'GET':
            contracts = Contract.objects.all()
            serializer = ContractSerializer(contracts,many=True)
            return Response(serializer.data)

    '''Create a new contract with uploaded image'''
    def post(self,request):
        print(request)
        data=request.data
        pdf=request.FILES['pdf']
        print(data)
        if data['renewble'] == 'true':
            state = True
        else:
            state=False
        user=User.objects.get(pk=int(data['inputer']))
        contract=Contract.objects.create(
            title=data['title'],
            contract_number=data['contract_number'],
            pdf=pdf,
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
            # department=data['department']
        )
        contract.department.set(json.loads(data['department']))
        # contract.department.set(data['department'])
        contract.save()
        serializer = ContractSerializer(contract,many=False)
        return Response(serializer.data)
    
    """update contract by pk"""
    def put(self, request, pk, format=None):
        contract = Contract.objects.filter(pk=pk)
        print(contract)
        contract.update(auth_status=True)
        return Response(status=status.HTTP_200_OK)

    '''Delete a contract by pk'''
    def delete(self, request, pk, format=None):
        Contract.objects.filter(pk=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

  
