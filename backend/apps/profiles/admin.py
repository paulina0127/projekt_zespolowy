from django.contrib import admin
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin

from .models import Company, Candidate, File, Experience, Education, CSkill, Course, Link

admin.site.register(Company)


@admin.register(File)  # Register File without displaying in Admin Panel
class FileAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


# Register Education without displaying in Admin Panel
@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


# Register Experience without displaying in Admin Panel
@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(CSkill)  # Register CSkill without displaying in Admin Panel
class CSkillAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(Course)  # Register Course without displaying in Admin Panel
class CourseAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(Link)  # Register Link without displaying in Admin Panel
class LinkAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}

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


@admin.register(Candidate)
class CandidateAdmin(admin.ModelAdmin, DynamicArrayMixin):
    inlines = [ExperienceInline, EducationInline,
               CSkillInline, CourseInline, LinkInline]  # Display Experience, Education, CSkill, Course and Link on Candidate form
