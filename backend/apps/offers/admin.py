from django.contrib import admin
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin

from .models import Application, Attachment, Offer, Requirement


@admin.register(Requirement)
class RequirementAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}  # Register Requirement without displaying in Admin Panel


@admin.register(Attachment)
class AttachmentAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}  # Register Attachment without displaying in Admin Panel


# Using StackedInline to display model on Offer form
class RequirementInline(admin.StackedInline):
    model = Requirement
    extra = 0


@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin, DynamicArrayMixin):
    inlines = [RequirementInline]  # Display Requirement on Offer form
    list_display = [
        "id",
        "company",
        "position",
        "category",
        "expiration_date",
        "is_verified",
    ]
    list_filter = ["company", "category", "is_verified"]


# Using StackedInline to display model on Application form
class AttachmentInline(admin.StackedInline):
    model = Attachment
    extra = 0


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    inlines = [AttachmentInline]  # Display Attachment on Application form
    list_display = ["id", "offer", "candidate", "created_date", "status"]
    list_filter = ["offer", "candidate", "status"]
