from django.contrib import admin
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin

from .models import (Candidate, Company, Course, CSkill, Education, Experience,
                     File, Link)


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "location", "auto_verify"]
    list_filter = ["auto_verify"]
    search_fields = [
        "name",
    ]


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}  # Register File without displaying in Admin Panel


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}  # Register Education without displaying in Admin Panel


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}  # Register Experience without displaying in Admin Panel


@admin.register(CSkill)
class CSkillAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}  # Register CSkill without displaying in Admin Panel


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}  # Register Course without displaying in Admin Panel


@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}  # Register Link without displaying in Admin Panel


# Using StackedInline to display models on Candiate form
class ExperienceInline(admin.StackedInline):
    model = Experience
    extra = 0


class EducationInline(admin.StackedInline):
    model = Education
    extra = 0


class CSkillInline(admin.StackedInline):
    model = CSkill
    extra = 0


class CourseInline(admin.StackedInline):
    model = Course
    extra = 0


class LinkInline(admin.StackedInline):
    model = Link
    extra = 0


class FileInline(admin.StackedInline):
    model = File
    extra = 0


@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin, DynamicArrayMixin):
    inlines = [
        ExperienceInline,
        EducationInline,
        CSkillInline,
        CourseInline,
        LinkInline,
        FileInline,
    ]  # Display Experience, Education, CSkill, Course and Link on Candidate form
    search_fields = ["first_name", "last_name"]
