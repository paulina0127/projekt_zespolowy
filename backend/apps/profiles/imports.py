from django.db import models
from django_better_admin_arrayfield.models.fields import ArrayField
from phonenumber_field.modelfields import PhoneNumberField

from apps.core.models import Location, Skill
from apps.users.models import User

from .utils.choices import EducationLevel, FileType, LinkType, SkillType
from .utils.validators import (
    validate_start_date,
    validate_end_date,
    validate_nip,
    validate_pesel,
    validate_file_extension,
    validate_unique_cskill,
    validate_cskill_name,
)
