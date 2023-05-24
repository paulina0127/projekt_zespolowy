from django.utils.translation import gettext_lazy as _
from django_filters import CharFilter, FilterSet

from ..models import Company


class CompanyFilter(FilterSet):
    location = CharFilter(method="filter_location", label=_("Lokalizacja"))

    class Meta:
        model = Company
        fields = ["location"]

    def filter_location(self, queryset, name, value):
        return queryset.filter(location__city=value)
