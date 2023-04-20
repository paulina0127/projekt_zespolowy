from django.utils.translation import gettext_lazy as _

from .imports.models_imports import *


class Location(models.Model):
    street_address = models.CharField(verbose_name=_("Ulica"), max_length=100)
    postal_code = models.CharField(
        verbose_name=_("Kod pocztowy"), max_length=6, validators=[validate_postal_code]
    )
    city = models.CharField(
        verbose_name=_("Miejscowość"), max_length=100, validators=[validate_city]
    )

    class Meta:
        verbose_name = _("Lokalizacja")
        verbose_name_plural = _("Lokalizacje")
        ordering = ["id"]

    def __str__(self) -> str:
        return self.street_address + ", " + self.postal_code + " " + self.city


class Skill(models.Model):
    type = models.CharField(
        verbose_name=_("Rodzaj"), max_length=50, choices=SkillType.choices
    )
    name = models.CharField(verbose_name=_("Nazwa"), max_length=50, unique=True)

    class Meta:
        verbose_name = _("Umiejętność")
        verbose_name_plural = _("Umiejętności")
        ordering = ["id"]

    def __str__(self) -> str:
        return self.name


class Category(models.Model):
    name = models.CharField(verbose_name=_("Nazwa"), max_length=100, unique=True)
    parent = models.ForeignKey(
        verbose_name=_("Kategoria główna"),
        to="self",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="subcategories",
    )

    class Meta:
        verbose_name = _("Kategoria")
        verbose_name_plural = _("Kategorie")
        ordering = ["id"]

    def __str__(self):
        return self.name

    def clean(self):
        validate_category_parent(self)
