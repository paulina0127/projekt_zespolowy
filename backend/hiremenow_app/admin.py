from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from .models import *
from django_better_admin_arrayfield.admin.mixins import DynamicArrayMixin

# Hiding models


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(Requirement)
class RequirementAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin, DynamicArrayMixin):
    def get_model_perms(self, request):
        return {}


@admin.register(CSkill)
class CSkillAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}


@admin.register(Attachment)
class AttachmentAdmin(admin.ModelAdmin):
    def get_model_perms(self, request):
        return {}

# Displaying models with one-to-many relations on the same page


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
class CandidateAdmin(admin.ModelAdmin):
    inlines = [ExperienceInline, EducationInline,
               CSkillInline, CourseInline, LinkInline]


class RequirementInline(admin.StackedInline):
    model = Requirement
    extra = 0


@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin, DynamicArrayMixin):
    inlines = [RequirementInline]


class AttachmentInline(admin.StackedInline):
    model = Attachment
    extra = 0


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    inlines = [AttachmentInline]

# Custom user model


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (('Personal info'), {'fields': ('first_name', 'last_name')}),
        (('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                      'groups', 'user_permissions')}),
        (('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)


admin.site.register(Skill)
admin.site.register(Category)
admin.site.register(Company)
