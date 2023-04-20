import re

from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _


# Unique fields
def validate_unique_fields(object):
    # Exclude the current object from the queryset when checking for duplicates
    queryset = type(object).objects.exclude(pk=object.pk)

    # Create a dictionary to hold the fields that have duplicates
    errors = {}

    # Loop through each unique field and check for duplicates
    for field in object._meta.fields:
        if field.unique:
            value = getattr(object, field.attname)
            if queryset.filter(**{field.attname: value}).exists():
                errors[field.name] = _(
                    "Obiekt z takim polem %(field_name)s już istnieje."
                ) % {"field_name": field.verbose_name}

    # raise a validation error if there are any duplicate fields
    if errors:
        raise ValidationError(errors)


# Location
def validate_postal_code(value):
    if not re.match(r"^\d{2}-\d{3}$", value):
        raise ValidationError(_("Kod pocztowy powinien być w formacie XX-XXX."))


def validate_city(value):
    if not value.replace(" ", "").isalpha():
        raise ValidationError(_("Miejscowość powinna składać się tylko z liter."))


# Category
def validate_category_parent(object):
    parent = object.parent

    # Check that the parent is not the same as the category
    if parent == object:
        raise ValidationError(
            {"parent": _("Kategoria nie może być swoją kategorią główną.")}
        )

    # Check that the parent is not a subcategory
    if object.parent and parent.parent is not None:
        raise ValidationError(
            {"parent": _("Podkategoria nie może być kategorią główną.")}
        )

    # If no validation errors were raised, return True
    return True
