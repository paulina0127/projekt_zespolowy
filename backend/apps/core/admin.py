from django.contrib import admin

from .models import Category, Location, Skill
from .utils.admin_filters import IsMainCategoryFilter, MainCategoryFilter


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):

    def get_model_perms(self, request):
        return {}  # Register Location without displaying in Admin Panel


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_filter = ["type", ]
    search_fields = ["name", ]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_filter = [MainCategoryFilter, IsMainCategoryFilter, ]
    search_fields = ["name", ]
