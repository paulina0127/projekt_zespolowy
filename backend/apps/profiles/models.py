from django.db import models
from django_better_admin_arrayfield.models.fields import ArrayField
from phonenumber_field.modelfields import PhoneNumberField

from apps.core.models import *
from apps.users.models import *

from .consts import *
from .validators import *


class Company(models.Model):
    nip = models.CharField(verbose_name="NIP", max_length=10, unique=True)
    name = models.CharField(verbose_name="Nazwa firmy", max_length=255)
    email = models.EmailField()
    phone_number = PhoneNumberField(verbose_name="Numer telefonu")
    location = models.OneToOneField(verbose_name="Lokalizacja",
                                    to=Location, related_name='companies', on_delete=models.CASCADE)
    website = models.URLField(verbose_name="Strona", blank=True, null=True)
    description = models.TextField(verbose_name="Opis")
    image = models.ImageField(verbose_name="Zdjęcie",
                              upload_to="companies/images", blank=True, null=True)

    user = models.OneToOneField(verbose_name="Konto",
                                to=User, related_name='company_profile', on_delete=models.CASCADE)
    auto_verify = models.BooleanField(verbose_name="Automatyczna weryfikacja")

    class Meta:
        verbose_name = 'Pracodawca'
        verbose_name_plural = 'Pracodawcy'

    def __str__(self) -> str:
        return self.name


class Candidate(models.Model):
    pesel = models.CharField(verbose_name="PESEL", max_length=11, unique=True)
    first_name = models.CharField(verbose_name="Imię", max_length=100)
    last_name = models.CharField(verbose_name="Nazwisko", max_length=100)
    phone_number = PhoneNumberField(verbose_name="Numer telefonu")
    location = models.OneToOneField(verbose_name="Lokalizacja",
                                    to=Location, related_name='candidates', on_delete=models.CASCADE)

    image = models.ImageField(
        verbose_name="Zdjęcie", upload_to="candidates/images", blank=True, null=True)

    user = models.OneToOneField(verbose_name="Konto",
                                to=User, related_name='candidate_profile', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Kandydat'
        verbose_name_plural = 'Kandydaci'

    def __str__(self) -> str:
        return self.first_name + " " + self.last_name


class File(models.Model):
    name = models.CharField(verbose_name="Nazwa", max_length=255)
    added_at = models.DateTimeField(
        verbose_name="Data dodania", auto_now_add=True)
    type = models.CharField(verbose_name="Rodzaj",
                            max_length=50, choices=FileType.choices)
    file = models.FileField(verbose_name="Plik",
                            upload_to="candidates/attachments")
    candidate = models.ForeignKey(verbose_name="Kandydat",
                                  to=Candidate, related_name='files', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Plik'
        verbose_name_plural = 'Pliki'

    def __str__(self) -> str:
        return self.name


class Experience(models.Model):
    position = models.CharField(verbose_name="Stanowisko", max_length=255)
    company = models.CharField(verbose_name="Nazwa firmy", max_length=255)
    location = models.OneToOneField(verbose_name="Lokalizacja",
                                    to=Location, related_name='experience', on_delete=models.CASCADE, blank=True, null=True)
    start_date = models.DateField(verbose_name="Data rozpoczęcia")
    end_date = models.DateField(
        verbose_name="Data zakończenia", blank=True, null=True)
    duties = ArrayField(
        models.TextField(), verbose_name="Obowiązki", blank=True, null=True)
    candidate = models.ForeignKey(verbose_name="Kandydat",
                                  to=Candidate, related_name='experience', on_delete=models.CASCADE)
    references = models.OneToOneField(verbose_name="Referencje",
                                      to=File, related_name='references', on_delete=models.CASCADE, blank=True, null=True)
    is_current = models.BooleanField(
        verbose_name="Aktualna")

    class Meta:
        verbose_name = 'Doświadczenie'
        verbose_name_plural = 'Doświadczenie'

    def __str__(self) -> str:
        return self.company + ", " + self.position


class Education(models.Model):
    institute = models.CharField(verbose_name="Uczelnia", max_length=255)
    education_level = models.CharField(verbose_name="Poziom wykształcenia",
                                       max_length=50, choices=EducationLevel.choices)
    major = models.CharField(
        "Kierunek", max_length=255)
    start_date = models.DateField(verbose_name="Data rozpoczęcia")
    end_date = models.DateField(
        verbose_name="Data zakończenia", blank=True, null=True)
    candidate = models.ForeignKey(verbose_name="Kandydat",
                                  to=Candidate, related_name='education', on_delete=models.CASCADE)
    diploma = models.OneToOneField(verbose_name="Dyplom",
                                   to=File, related_name='diplomas', on_delete=models.CASCADE, blank=True, null=True)
    is_current = models.BooleanField(
        verbose_name="Aktualne")

    class Meta:
        verbose_name = 'Wykształcenie'
        verbose_name_plural = 'Wykształcenie'

    def __str__(self) -> str:
        return self.institute + " " + self.major + ", " + self.education_level


class CSkill(models.Model):
    type = models.CharField("Rodzaj", max_length=50,
                            choices=SkillType.choices, blank=True)
    name = models.CharField("Nazwa", max_length=255, blank=True)
    level = models.CharField("Poziom", max_length=50, blank=True, null=True)
    candidate = models.ForeignKey(verbose_name="Kandydat",
                                  to=Candidate, on_delete=models.CASCADE, related_name='skills')
    skill = models.ForeignKey(verbose_name="Umiejętność",
                              to=Skill, related_name='skills', on_delete=models.CASCADE, blank=True, null=True)
    certificate = models.OneToOneField(verbose_name="Certyfikat",
                                       to=File, related_name='skill_certificates', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = 'Umiejętność'
        verbose_name_plural = 'Umiejętności'

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
        super(CSkill, self).save(*args, **kwargs)


class Course(models.Model):
    name = models.CharField(verbose_name="Nazwa", max_length=255)
    description = models.TextField(verbose_name="Opis", blank=True, null=True)
    start_date = models.DateField(verbose_name="Data rozpoczęcia")
    end_date = models.DateField(verbose_name="Data zakończenia")
    candidate = models.ForeignKey(verbose_name="Kandydat",
                                  to=Candidate, related_name='courses', on_delete=models.CASCADE)
    certificate = models.OneToOneField(verbose_name="Certyfikat",
                                       to=File, related_name='certificates', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = 'Kurs'
        verbose_name_plural = 'Kursy'

    def __str__(self) -> str:
        return self.name


class Link(models.Model):
    type = models.CharField(verbose_name="Rodzaj",
                            max_length=50, choices=LinkType.choices)
    url = models.URLField(verbose_name="Adres URL")
    candidate = models.ForeignKey(verbose_name="Kandydat",
                                  to=Candidate, related_name='links', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Link'
        verbose_name_plural = 'Linki'

    def __str__(self) -> str:
        return self.url
