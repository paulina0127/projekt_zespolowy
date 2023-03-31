from django.contrib import admin

from .models import *

admin.site.register(Skill)
admin.site.register(Category)


@admin.register(Location)  # Hide Location in admin panel
class LocationAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}
