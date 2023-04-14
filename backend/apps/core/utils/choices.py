from django.db import models
from django.utils.translation import gettext_lazy as _


class SkillType(models.TextChoices):
    LANGUAGE = "Język", _("Język")
    SOFT_SKILL = "Umiejętność miękka", _("Umiejętność miękka")
    HARD_SKILL = "Umiejętność twarda", _("Umiejętność twarda")
    OTHER = "Inny", _("Inny")
