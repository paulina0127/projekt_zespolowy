from django.contrib import admin
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin

from .models import Offer, Requirement, Application, Attachment


@admin.register(Requirement)  # Hide Requirement in Admin Panel
class RequirementAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(Attachment)  # Hide Attachment in Admin Panel
class AttachmentAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


class RequirementInline(admin.StackedInline):
    model = Requirement
    extra = 0


@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin, DynamicArrayMixin):
    inlines = [RequirementInline]  # Display Requirement on Offer form


class AttachmentInline(admin.StackedInline):
    model = Attachment
    extra = 0


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    inlines = [AttachmentInline]  # Display Attachment on Application form
