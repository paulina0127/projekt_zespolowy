from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('apps.core.urls')),
    path('', include('apps.profiles.urls')),
    path('', include('apps.offers.urls')),
    path('', include('apps.users.urls')),
]
