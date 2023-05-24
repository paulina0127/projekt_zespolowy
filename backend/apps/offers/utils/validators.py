import re

from django.core.exceptions import ValidationError
from django.utils import timezone
from django.utils.translation import gettext as _


# Offer
def validate_salary(value):
    if not re.match(r"\d+(\s*-\s*\d+)?$", value):
        raise ValidationError(
            _(
                "Wynagrodzenie powinno być w formie pojedynczej kwoty bądź widełek płacowych."
            )
        )


def validate_expiration_date(value):
    if value <= timezone.now():
        raise ValidationError(_("Data wygaśnięcia nie może być w przeszłości."))


# Requiremnt
def validate_requirement_name(object):
    if not object.skill and not object.name:
        raise ValidationError(
            _("Wybierz umiejętność z listy lub wpisz nazwę umiejętności.")
        )


# Application
def validate_mark_range(value):
    if value is not None and (value < 1 or value > 5):
        raise ValidationError(
            _("Ocena kompetencji powinna być w przedziale pomiędzy 1 a 5.")
        )


def validate_unique_application(object, model):
    existing = model.objects.filter(
        candidate=object.candidate,
        offer=object.offer,
    ).exclude(id=object.id)
    if existing.exists():
        raise ValidationError(_("Aplikacja została już złożona dla tej oferty."))


# Attachment
def validate_unique_attachment(object, model):
    existing = model.objects.filter(
        application=object.application,
        file=object.file,
    ).exclude(id=object.id)
    if existing.exists():
        raise ValidationError(_("Wybrany plik już jest dołączony do tej aplikacji."))
