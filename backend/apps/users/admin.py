from django.contrib import admin
from django.contrib.auth import models as auth
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from .models import Group, User

# Unregister default Group model from auth page
admin.site.unregister(auth.Group)


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    fieldsets = (
        (None, {"fields": ("email", "password", "type")}),
        (("Personal info"), {"fields": ("first_name", "last_name")}),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "type"),
            },
        ),
    )
    list_display = ("id", "email", "type", "is_active", "is_staff", "is_superuser")
    search_fields = ("email", "first_name", "last_name", "type")
    list_filter = (
        "type",
        "is_staff",
        "is_superuser",
        "is_active",
    )
    ordering = ("type",)

    def save_model(self, request, obj, form, change):
        # Add the user to the appropriate group based on their type
        super().save_model(request, obj, form, change)
        group = Group.objects.get(name=obj.type)
        obj.groups.add(group)


@admin.register(Group)  # Register default Group model in users page
class GroupAdmin(admin.ModelAdmin):
    filter_horizontal = [
        "permissions",
    ]
