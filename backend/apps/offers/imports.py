from django.db import models
from django_better_admin_arrayfield.models.fields import ArrayField

from apps.core.models import Category, Location, Skill
from apps.profiles.models import Candidate, Company, File

from .utils.choices import (
    ApplicationStatus,
    ApplicationType,
    ContractType,
    PositionLevel,
    SkillType,
    WorkingMode,
    WorkingTime,
)
from .utils.fields import ChoiceArrayField
from .utils.validators import (
    validate_salary,
    validate_expiration_date,
    validate_unique_requirement,
    validate_requirement_name,
    validate_mark_range,
    validate_unique_application,
    validate_unique_attachment,
)
