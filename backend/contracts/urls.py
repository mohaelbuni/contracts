from django.urls import path
from . import views

urlpatterns = [
    path('send-email/',views.sendEmail),
    path('up-data/',views.Contracts.as_view()),
    path('up-data/<int:pk>',views.Contracts.as_view()),
]