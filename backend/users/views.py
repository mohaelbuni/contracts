from django.shortcuts import render
# from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .serializers import UserSerializer, UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.views import APIView

User = get_user_model()

# ----- Users Routes -----


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data

        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        
        if data['user_type'] == 'ADMIN':
            user = User.objects.create(
            username=data['username'],
            user_type=data['user_type'],
            is_staff=True,
            password=make_password(data['password'])
            )
        else:
            user = User.objects.create(
                username=data['username'],
                user_type=data['user_type'],
                password=make_password(data['password'])
            )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'details': 'User with this email already exists!'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


class Users(APIView):

    '''Get all Users'''  
    def get(self,request):
        if request.method == 'GET':
            users = User.objects.all()
            serializer = UserSerializer(users,many=True)
            return Response(serializer.data)
    
    """update user by pk"""
    def put(self, request, pk, format=None):
        user = User.objects.filter(pk=pk)
        
        if user.values()[0]['is_active'] == False:
            user.update(is_active=True)
        else:
            user.update(is_active=False)
            
        return Response(status=status.HTTP_200_OK)

    '''Delete a user by pk'''
    def delete(self, request, pk, format=None):
        User.objects.filter(pk=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    




