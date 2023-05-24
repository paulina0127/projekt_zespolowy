from django.db import models
from django.utils.translation import gettext_lazy as _


class SkillType(models.TextChoices):
    LANGUAGE = "Język", _("Język")
    SOFT_SKILL = "Umiejętność miękka", _("Umiejętność miękka")
    HARD_SKILL = "Umiejętność twarda", _("Umiejętność twarda")
    OTHER = "Inny", _("Inny")


class FileType(models.TextChoices):
    CV = "CV", _("CV")
    CERTIFICATE = "Certyfikat", _("Certyfikat")
    REFERENCES = "Referencje", _("Referencje")
    DIPLOMA = "Dyplom", _("Dyplom")
    COVER_LETTER = "List motywacyjny", _("List motywacyjny")
    OTHER = "Inny", _("Inny")


class EducationLevel(models.TextChoices):
    PRIMARY = "Podstawowe", _("Podstawowe")
    MIDDLE = "Zawodowe", _("Zawodowe")
    SECONDARY = "Średnie", _("Średnie")
    BACHELOR = "Licencjat", _("Licencjat")
    ENGINEER = "Inżynier", _("Inżynier")
    MASTER = "Magister", _("Magister")
    MASTER_ENGINEER = "Magister inżynier", _("Magister inżynier")
    DOCTOR = "Doktor", _("Doktor")
    POSTDOCTOR = "Doktor habilitowany", _("Doktor habilitowany")
    PROFESSOR = "Profesor", _("Profesor")
    POSTGRAD = "Studia podyplomowe", _("Studia podyplomowe")
    MEDICINE_PHYSICIAN = "Lekarz medycyny", _("Lekarz medycyny")


class LinkType(models.TextChoices):
    PORTFOLIO = "Portfolio", _("Portfolio")
    PERSONAL_WEBSITE = "Strona osobista", _("Strona osobista")
    COMPANY_WEBSITE = "Strona firmowa", _("Strona firmowa")
    PROJECT = "Projekt", _("Projekt")
    SOCIAL_MEDIA = "Profil społecznościowy", _("Profil społecznościowy")
    OTHER = "Inny", _("Inny")
