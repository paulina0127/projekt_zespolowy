from django.db import models
from django.utils.translation import gettext_lazy as _


class SkillType(models.TextChoices):
    LANGUAGE = "Język", _("Język")
    SOFT_SKILL = "Umiejętność miękka", _("Umiejętność miękka")
    HARD_SKILL = "Umiejętność twarda", _("Umiejętność twarda")
    OTHER = "Inny", _("Inny")


class PositionLevel(models.TextChoices):
    INTERN = "Praktykant / Stażysta", _("Praktykant / Stażysta")
    ASSISTANT = "Asystent", _("Asystent")
    JUNIOR = "Młodszy specjalista (Junior)", _("Młodszy specjalista (Junior)")
    MID = "Specjalista (Mid / Regular)", _("Specjalista (Mid / Regular)")
    SENIOR = "Starszy specjalista (Senior)", _("Starszy specjalista (Senior)")
    EXPERT = "Ekspert / Lider", _("Ekspert / Lider")
    SUPERVISOR = "Kierownik", _("Kierownik")
    MANAGER = "Menedżer", _("Menedżer")
    DIRECTOR = "Dyrektor / Prezes", _("Dyrektor / Prezes")
    WORKER = "Pracownik fizyczny", _("Pracownik fizyczny")


class ContractType(models.TextChoices):
    EMPLOYMENT_CONTRACT = "Umowa o pracę", _("Umowa o pracę")
    CIVIL_CONTRACT = "Umowa zlecenie", _("Umowa zlecenie")
    COMMISSION_CONTRACT = "Umowa o dzieło", _("Umowa o dzieło")
    TEMPORARY_CONTRACT = "Umowa o pracę tymczasową", _("Umowa o pracę tymczasową")
    REPLACEMENT_CONTRACT = "Umowa na zastępstwo", _("Umowa na zastępstwo")
    AGENCY_CONTRACT = "Umowa agencyjna", _("Umowa agencyjna")
    B2B_CONTRACT = "Kontrakt B2B", _("Kontrakt B2B")
    INTERNSHIP_CONTRACT = "Staż / Praktyka", _("Staż / Praktyka")


class WorkingMode(models.TextChoices):
    REMOTE_WORK = "Praca zdalna", _("Praca zdalna")
    HYBRID_WORK = "Praca hybrydowa", _("Praca hybrydowa")
    STATIONARY_WORK = "Praca stacjonarna", _("Praca stacjonarna")
    MOBILE_WORK = "Praca mobilna", _("Praca mobilna")


class WorkingTime(models.TextChoices):
    FULL_TIME = "Pełny etat", _("Pełny etat")
    PART_TIME = "Część etatu", _("Część etatu")
    TEMPORARY_WORK = "Praca dodatkowa / tymczasowa", _("Praca dodatkowa / tymczasowa")


class ApplicationType(models.TextChoices):
    PROFILE = "Profil kandydata", _("Profil kandydata")
    CV = "CV", _("CV")


class ApplicationStatus(models.TextChoices):
    SUBMTTED = "Złożona", _("Złożona")
    ACCEPTED = "Zaakceptowana", _("Zaakceptowana")
    REJECTED = "Odrzucona", _("Odrzucona")
