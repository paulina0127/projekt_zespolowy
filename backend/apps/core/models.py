from django.db import models

from .consts import *
from .validators import *


class Location(models.Model):
    street_address = models.CharField(verbose_name="Ulica", max_length=100)
    postal_code = models.CharField(verbose_name="Kod pocztowy", max_length=6)
    city = models.CharField(verbose_name="Miejscowość", max_length=100)

    class Meta:
        verbose_name = 'Lokalizacja'
        verbose_name_plural = 'Lokalizacje'

    def __str__(self) -> str:
        return str(self.id) + ": " + self.street_address + ", " + self.postal_code + " " + self.city


class Skill(models.Model):
    type = models.CharField(verbose_name="Rodzaj",
                            max_length=50, choices=SkillType.choices)
    name = models.CharField(verbose_name="Nazwa", max_length=50, unique=True)

    class Meta:
        verbose_name = 'Umiejętność'
        verbose_name_plural = 'Umiejętności'

    def __str__(self) -> str:
        return self.type + " " + self.name


class Category(models.Model):
    name = models.CharField(verbose_name="Nazwa", max_length=100, unique=True)
    parent = models.ForeignKey(verbose_name="Kategoria główna",
                               to='self', on_delete=models.CASCADE, blank=True, null=True, related_name='subcategories')

    class Meta:
        verbose_name = 'Kategoria'
        verbose_name_plural = 'Kategorie'

    def __str__(self):
        return self.name
