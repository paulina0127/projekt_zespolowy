from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.urls import include, path

urlpatterns = i18n_patterns(
    path("admin/", admin.site.urls),
    path("", include("apps.core.urls")),
    path("", include("apps.profiles.urls")),
    path("", include("apps.offers.urls")),
    path("", include("apps.users.urls")),
    # If no prefix is given, use the default language
    prefix_default_language=False,
)
