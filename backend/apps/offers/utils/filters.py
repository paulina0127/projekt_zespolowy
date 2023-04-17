from django.utils.translation import gettext_lazy as _
from django_filters import FilterSet, CharFilter

from ..models import Offer


class OfferFilter(FilterSet):
    location = CharFilter(method="filter_location", label=_("Lokalizacja"))

    class Meta:
        model = Offer
        fields = ["location"]

    def filter_location(self, queryset, name, value):
        return queryset.filter(location__city=value)
