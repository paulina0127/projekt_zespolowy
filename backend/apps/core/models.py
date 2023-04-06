from django.db import models

from .choices import SkillType
from .consts import *
from .validators import *


class Location(models.Model):
    street_address = models.CharField(
        verbose_name=STREET_ADDRESS, max_length=100)
    postal_code = models.CharField(verbose_name=POSTAL_CODE, max_length=6)
    city = models.CharField(verbose_name=CITY, max_length=100)

    class Meta:
        verbose_name = LOCATION
        verbose_name_plural = LOCATIONS

    def __str__(self) -> str:
        return str(self.id) + ": " + self.street_address + ", " + self.postal_code + " " + self.city


class Skill(models.Model):
    type = models.CharField(verbose_name=CATEGORY_TYPE,
                            max_length=50, choices=SkillType.choices)
    name = models.CharField(verbose_name=SKILL_NAME,
                            max_length=50, unique=True)

    class Meta:
        verbose_name = SKILL
        verbose_name_plural = SKILLS

    def __str__(self) -> str:
        return self.type + " " + self.name


class Category(models.Model):
    name = models.CharField(verbose_name=CATEGORY_NAME,
                            max_length=100, unique=True)
    parent = models.ForeignKey(verbose_name=CATEGORY_PARENT,
                               to='self', on_delete=models.CASCADE, blank=True, null=True, related_name='subcategories')

    class Meta:
        verbose_name = CATEGORY
        verbose_name_plural = CATEGORIES

    def __str__(self):
        return self.name
