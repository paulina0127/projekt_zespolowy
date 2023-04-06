from django.contrib import admin

from .models import Location, Skill, Category

admin.site.register(Skill)
admin.site.register(Category)


@admin.register(Location)  # Hide Location in Admin Panel
class LocationAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}
