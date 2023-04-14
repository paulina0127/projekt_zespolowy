from django.contrib import admin

from .models import Location, Skill, Category


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):

    def get_model_perms(self, request):
        return {}  # Register Location without displaying in Admin Panel


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_filter = [
        "type",
    ]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    search_fields = [
        "name",
    ]
