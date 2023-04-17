from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from ..models import Category


class MainCategoryFilter(admin.SimpleListFilter):
    title = _("Kategoria główna")
    parameter_name = "main_category"

    def lookups(self, request, model_admin):
        main_categories = Category.objects.filter(parent=None)
        return [(category.id, str(category)) for category in main_categories]

    def queryset(self, request, queryset):
        if self.value() is None:
            return queryset
        return queryset.filter(parent=self.value())


class IsMainCategoryFilter(admin.SimpleListFilter):
    title = _("Główna")
    parameter_name = "is_main"

    def lookups(self, request, model_admin):
        return (
            ('true', _('Tak')),
            ('false', _('Nie')),
        )

    def queryset(self, request, queryset):
        if self.value() == "true":
            return queryset.filter(parent=None)
        elif self.value() == "false":
            return queryset.exclude(parent=None)
        else:
            return queryset
