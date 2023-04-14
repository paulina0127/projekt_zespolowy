from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
import re
import os
from django.utils import timezone


# Start date and end date for Experience, Education and Course
def validate_start_date(object):
    if object.start_date > timezone.now():
        raise ValidationError(_("Data rozpoczęcia nie może być w przyszłości."))
    if object.end_date < object.start_date:
        raise ValidationError(_("Data rozpoczęcia nie może być po dacie zakończenia."))


def validate_end_date(object):
    if object.end_date > timezone.now():
        raise ValidationError(_("Data zakończenia nie może być w przyszłości."))
    if object.end_date < object.start_date:
        raise ValidationError(_("Data zakończenia nie może być przed datą rozpoczęcia."))


# Company
def validate_nip(value):
    if not re.match(r"^[0-9]{10}$", value):
        raise ValidationError(_("NIP powinien składać się z 10 cyfr."))


# Candidate
def validate_pesel(value):
    if not re.match(r"^[0-9]{11}$", value):
        raise ValidationError(_("PESEL powinien składać się z 11 cyfr."))


# File
def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1]  # [0] returns path + filename
    valid_extensions = [".pdf", ".doc", ".docx", ".jpg", ".png"]
    if not ext.lower() in valid_extensions:
        raise ValidationError(_("Niepoprawne rozszerzenie pliku."))


# CSkill
def validate_unique_cskill(object, model):
    existing = model.objects.filter(skill=object.skill, ).exclude(id=object.id)
    if existing.exists():
        raise ValidationError(_("Wybrana umiejętność już istnieje."))


def validate_cskill_name(object):
    if not object.skill and not object.name:
        raise ValidationError(_("Wybierz umiejętność z listy lub wpisz nazwę umiejętności."))
