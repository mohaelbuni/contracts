from django.urls import path
from . import views

urlpatterns = [
    path('send-email/',views.sendEmail),
    path('get-data/',views.getData),
    path('save-data/',views.saveData),
    path('up-data/',views.UploadTest.as_view()),

]