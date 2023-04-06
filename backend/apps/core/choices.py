from django.db import models


class SkillType(models.TextChoices):
    LANGUAGE = "Język", "Język"
    SOFT_SKILL = "Umiejętność miękka", "Umiejętność miękka"
    HARD_SKILL = "Umiejętność twarda", "Umiejętność twarda"
    OTHER = "Inny", "Inny"

