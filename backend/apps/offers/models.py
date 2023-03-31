from django.contrib.postgres.fields import ArrayField as PostgresArrayField
from django.db import models
from django.forms import CheckboxSelectMultiple, MultipleChoiceField
from django_better_admin_arrayfield.models.fields import ArrayField

from apps.core.models import *
from apps.profiles.models import *
from apps.users.models import *

from .consts import *
from .validators import *

# Setup for multiple choice field stored as Array


class MultipleChoiceField(MultipleChoiceField):
    def __init__(self, *args, **kwargs):
        kwargs.pop("base_field", None)
        kwargs.pop("max_length", None)
        super().__init__(*args, **kwargs)


class ChoiceArrayField(PostgresArrayField):
    def formfield(self, **kwargs):
        return super().formfield(**{"form_class": MultipleChoiceField,
                                    "choices": self.base_field.choices, 'widget': CheckboxSelectMultiple,
                                    **kwargs})


class Offer(models.Model):
    position = models.CharField(verbose_name="Stanowisko", max_length=255)
    position_level = models.CharField(
        verbose_name="Poziom stanowiska", max_length=50, choices=PositionLevel.choices)
    location = models.OneToOneField(verbose_name="Lokalizacja",
                                    to=Location, related_name='offers', on_delete=models.CASCADE)
    category = models.ForeignKey(verbose_name="Kategoria",
                                 to=Category, related_name='offers', on_delete=models.CASCADE)
    salary = models.CharField(
        verbose_name="Wynagrodzenie", max_length=50, blank=True, null=True)
    contract_type = ChoiceArrayField(verbose_name="Rodzaj umowy", base_field=models.CharField(
        max_length=50, choices=ContractType.choices))
    working_mode = ChoiceArrayField(
        verbose_name="Tryb pracy", base_field=models.CharField(choices=WorkingMode.choices, max_length=255))
    working_time = ChoiceArrayField(
        verbose_name="Wymiar pracy", base_field=models.CharField(choices=WorkingTime.choices, max_length=255))
    duties = ArrayField(models.TextField(), verbose_name="Obowiązki")
    advantages = ArrayField(
        models.TextField(), verbose_name="Zalety", blank=True, null=True)
    created_date = models.DateTimeField(
        verbose_name="Data utworzenia", auto_now_add=True)
    expiration_date = models.DateTimeField(verbose_name="Data wygaśnięcia")

    company = models.ForeignKey(verbose_name="Pracodawca",
                                to=Company, related_name='offers', on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name="Aktualna")
    is_verified = models.BooleanField(verbose_name="Zweryfikowana")

    class Meta:
        verbose_name = 'Oferta'
        verbose_name_plural = 'Oferty'

    def __str__(self) -> str:
        return self.company.name + " " + self.position

    def save(self, *args, **kwargs):
        # If the company has auto_verify set to True then the offer is automatically verified
        if self.company.auto_verify:
            self.is_verified = True
        super(Offer, self).save(*args, **kwargs)


class Requirement(models.Model):
    type = models.CharField(verbose_name="Rodzaj",
                            max_length=50, choices=SkillType.choices, blank=True)
    name = models.CharField(verbose_name="Nazwa", max_length=100, blank=True)
    level = models.CharField(verbose_name="Poziom",
                             max_length=50, blank=True, null=True)
    offer = models.ForeignKey(verbose_name="Oferta",
                              to=Offer, on_delete=models.CASCADE, related_name='requirements')
    skill = models.ForeignKey(verbose_name="Umiejętność",
                              to=Skill, related_name='requirements', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = 'Wymaganie'
        verbose_name_plural = 'Wymagania'

    def __str__(self) -> str:
        if self.level:
            return self.type + " " + self.name + ", " + self.level
        else:
            return self.type + " " + self.name

    # If skill is selected from catalog, fill in type and name
    def save(self, *args, **kwargs):
        if self.skill:
            self.type = self.skill.type
            self.name = self.skill.name
        super(Requirement, self).save(*args, **kwargs)


class Application(models.Model):
    date = models.DateTimeField(
        auto_now_add=True, verbose_name="Data złożenia", blank=True)
    status = models.CharField(verbose_name="Status",
                              max_length=50, choices=ApplicationStatus.choices, blank=True)
    type = models.CharField(
        verbose_name="Typ", max_length=50, choices=ApplicationType.choices)
    mark = models.IntegerField(
        verbose_name="Ocena kompetencji", blank=True, null=True)
    notes = models.TextField(verbose_name="Notatki", blank=True, null=True)
    candidate = models.ForeignKey(verbose_name="Kandydat",
                                  to=Candidate, related_name='applications', on_delete=models.CASCADE)
    offer = models.ForeignKey(verbose_name="Oferta",
                              to=Offer, related_name='applications', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Aplikacja'
        verbose_name_plural = 'Aplikacje'

    # Set status to submitted at create
    def save(self, *args, **kwargs):
        if not self.status:
            self.status = ApplicationStatus.SUBMTTED
        super(Application, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return "Id: " + str(self.id)


class Attachment(models.Model):
    application = models.ForeignKey(verbose_name="Aplikacja",
                                    to=Application, related_name='attachments', on_delete=models.CASCADE)
    file = models.ForeignKey(verbose_name="Plik",
                             to=File, related_name='attachments', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Załącznik'
        verbose_name_plural = 'Załączniki'

    def __str__(self) -> str:
        return "Id: " + str(self.id)
