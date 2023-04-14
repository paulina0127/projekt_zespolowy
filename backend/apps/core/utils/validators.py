import re

from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _


# Location
def validate_postal_code(value):
    if not re.match(r"^\d{2}-\d{3}$", value):
        raise ValidationError("Kod pocztowy powinien być w formacie XX-XXX.")


def validate_city(value):
    if not value.replace(" ", "").isalpha():
        raise ValidationError(_("Miejscowość powinna składać się tylko z liter."))


# Category
def validate_category_parent(object):
    parent = object.parent

    # Check that the parent is not the same as the category
    if parent == object:
        raise ValidationError(_("Kategoria nie może być swoją kategorią główną."))

    # If no validation errors were raised, return True
    return True
