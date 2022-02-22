from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    
    class Meta:
        model = User 
        fields = ('id','username','user_type','email','name','_id','isAdmin','is_active','is_superuser')
    
    def get_isAdmin(self,obj):
        return obj.is_staff
    
    def get__id(self,obj):
        return obj.id
        
    def get_name(self,obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ('id','username','email','user_type','name','_id','isAdmin','token',)
    
    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)