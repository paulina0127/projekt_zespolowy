from django.db import models


class SkillType(models.TextChoices):
    LANGUAGE = "Język", "Język"
    SOFT_SKILL = "Umiejętność miękka", "Umiejętność miękka"
    HARD_SKILL = "Umiejętność twarda", "Umiejętność twarda"
    OTHER = "Inny", "Inny"


class FileType(models.TextChoices):
    CV = "CV", "CV"
    CERTIFICATE = "Certyfikat", "Certyfikat"
    REFERENCES = "Referencje", "Referencje"
    DIPLOMA = "Dyplom", "Dyplom"
    COVER_LETTER = "List motywacyjny", "List motywacyjny"
    OTHER = "Inny", "Inny"


class EducationLevel(models.TextChoices):
    PRIMARY = "Podstawowe", "Podstawowe"
    MIDDLE = "Zawodowe", "Zawodowe"
    SECONDARY = "Średnie", "Średnie"
    BACHELOR = "Licencjat", "Licencjat"
    ENGINEER = "Inżynier", "Inżynier"
    MASTER = "Magister", "Magister"
    MASTER_ENGINEER = "Magister inżynier", "Magister inżynier"
    DOCTOR = "Doktor", "Doktor"
    POSTDOCTOR = "Doktor habilitowany", "Doktor habilitowany"
    PROFESSOR = "Profesor", "Profesor"
    POSTGRAD = "Studia podyplomowe", "Studia podyplomowe"
    MEDICINE_PHYSICIAN = "Lekarz medycyny", "Lekarz medycyny"


class LinkType(models.TextChoices):
    PORTFOLIO = "Portfolio", "Portfolio"
    PERSONAL_WEBSITE = "Strona osobista", "Strona osobista"
    COMPANY_WEBSITE = "Strona firmowa", "Strona firmowa"
    PROJECT = "Projekt", "Projekt"
    SOCIAL_MEDIA = "Profil społecznościowy",  "Profil społecznościowy"
    OTHER = "Inny", "Inny"
