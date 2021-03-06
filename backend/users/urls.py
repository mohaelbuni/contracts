from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view() , name='token_obtain_pair'),
    path('register/', views.registerUser, name='register'),
    path('up-user-type/',views.updateUserType, name='update-user-type'),
    path('up-user/',views.Users.as_view()),
    path('up-user/<int:pk>',views.Users.as_view()),

]