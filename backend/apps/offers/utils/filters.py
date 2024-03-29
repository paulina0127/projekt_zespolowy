from django.forms import CheckboxSelectMultiple
from django.utils.translation import gettext_lazy as _
from django_filters import (BooleanFilter, CharFilter, FilterSet,
                            ModelChoiceFilter, ModelMultipleChoiceFilter,
                            MultipleChoiceFilter)

from apps.core.models import Category
from apps.profiles.models import Company

from ..models import Application, Offer
from ..utils.choices import (ContractType, PositionLevel, WorkingMode,
                             WorkingTime)


class OfferFilter(FilterSet):
    all = BooleanFilter(method="filter_all", label=_("Wszystkie"))
    location = CharFilter(method="filter_location", label=_("Lokalizacja"))
    category = ModelMultipleChoiceFilter(
        queryset=Category.objects.all(), widget=CheckboxSelectMultiple
    )
    position_level = MultipleChoiceFilter(
        choices=PositionLevel.choices, 
        widget=CheckboxSelectMultiple,
        method="filter_position_level",
    )
    contract_type = MultipleChoiceFilter(
        choices=ContractType.choices, 
        widget=CheckboxSelectMultiple,
        method="filter_contract_type",
    )
    working_mode = MultipleChoiceFilter(
        choices=WorkingMode.choices, 
        widget=CheckboxSelectMultiple,
        method="filter_working_mode",

    )
    working_time = MultipleChoiceFilter(
        choices=WorkingTime.choices, 
        widget=CheckboxSelectMultiple,
        method="filter_working_time",
    )

    class Meta:
        model = Offer
        fields = [
            "location",
            "company",
            "category",
            "position_level",
            "contract_type",
            "working_mode",
            "working_time",
        ]

    def filter_position_level(self, queryset, name, value):
      return queryset.filter(position_level__exact=value)
    
    def filter_contract_type(self, queryset, name, value):
      value = "{" + ",".join(f'"{v}"' for v in value) + "}"
      return queryset.filter(contract_type__contains=value)
    
    def filter_working_mode(self, queryset, name, value):
      value = "{" + ",".join(f'"{v}"' for v in value) + "}"
      return queryset.filter(working_mode__contains=value)
    
    def filter_working_time(self, queryset, name, value):
      value = "{" + ",".join(f'"{v}"' for v in value) + "}"
      return queryset.filter(working_time__contains=value)


    def filter_location(self, queryset, name, value):
        return queryset.filter(location__city=value)

    def filter_all(self, queryset, name, value):
        if value:
            return queryset.all()
        else:
            return queryset


class ApplicationFilter(FilterSet):
    company = ModelChoiceFilter(
        queryset=Company.objects.all(),
        label=_("Pracodawca"),
        field_name="offer__company",
    )

    class Meta:
        model = Application
        fields = ["candidate", "offer", "company", "status"]
