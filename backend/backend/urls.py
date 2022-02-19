from django.contrib import admin
from django.urls import path,include
from django.conf import settings #add this
from django.conf.urls.static import static #add this


urlpatterns = [
    path('admin/', admin.site.urls),
    path('contracts/',include('contracts.urls')),
    path('alerts/',include('alerts.urls')),
    path('users/',include('users.urls'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
