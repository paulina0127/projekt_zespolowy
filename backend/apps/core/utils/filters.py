from django.utils.translation import gettext_lazy as _
from django_filters import BooleanFilter, FilterSet, ModelChoiceFilter

from ..models import Category


class CategoryFilter(FilterSet):
    is_main = BooleanFilter(method="filter_is_main", label=_("Główna"))
    main_category = ModelChoiceFilter(queryset=Category.objects.filter(parent=None),
                                      label=_("Kategoria główna"), field_name="parent")

    class Meta:
        model = Category
        fields = ["main_category", "is_main"]

    def filter_is_main(self, queryset, name, value):
        if value:
            return queryset.filter(parent=None)
        elif not value:
            return queryset.exclude(parent=None)
        else:
            return queryset
