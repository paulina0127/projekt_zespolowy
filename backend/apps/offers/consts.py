from django.db import models


class SkillType(models.TextChoices):
    LANGUAGE = "Język", "Język"
    SOFT_SKILL = "Umiejętność miękka", "Umiejętność miękka"
    HARD_SKILL = "Umiejętność twarda", "Umiejętność twarda"
    OTHER = "Inny", "Inny"


class PositionLevel(models.TextChoices):
    INTERN = "Praktykant / Stażysta", "Praktykant / Stażysta"
    ASSISTANT = "Asystent", "Asystent"
    JUNIOR = "Młodszy specjalista", "Młodszy specjalista (Junior)"
    MID = "Specjalista", "Specjalista (Mid / Regular)"
    SENIOR = "Starszy specjalista", "Starszy specjalista (Senior)"
    EXPERT = "Ekspert / Lider", "Ekspert / Lider"
    SUPERVISOR = "Kierownik", "Kierownik"
    MANAGER = "Menedżer", "Menedżer"
    DIRECTOR = "Dyrektor / Prezes", "Dyrektor / Prezes"
    WORKER = "Pracownik fizyczny", "Pracownik fizyczny"


class ContractType(models.TextChoices):
    EMPLOYMENT_CONTRACT = "Umowa o pracę", "Umowa o pracę"
    CIVIL_CONTRACT = "Umowa zlecenie", "Umowa zlecenie"
    COMMISSION_CONTRACT = "Umowa o dzieło", "Umowa o dzieło"
    TEMPORARY_CONTRACT = "Umowa o pracę tymczasową", "Umowa o pracę tymczasową"
    REPLACEMENT_CONTRACT = "Umowa na zastępstwo", "Umowa na zastępstwo"
    AGENCY_CONTRACT = "Umowa agencyjna", "Umowa agencyjna"
    B2B_CONTRACT = "Kontrakt B2B", "Kontrakt B2B"
    INTERNSHIP_CONTRACT = "Staż / Praktyka", "Staż / Praktyka"


class WorkingMode(models.TextChoices):
    REMOTE_WORK = "Praca zdalna", "Praca zdalna"
    HYBRID_WORK = "Praca hybrydowa", "Praca hybrydowa"
    STATIONARY_WORK = "Praca stacjonarna", "Praca stacjonarna"
    MOBILE_WORK = "Praca mobilna", "Praca mobilna"


class WorkingTime(models.TextChoices):
    FULL_TIME = "Pełny etat", "Pełny etat"
    PART_TIME = "Część etatu", "Część etatu"
    TEMPORARY_WORK = "Praca dodatkowa / tymczasowa", "Praca dodatkowa / tymczasowa"


class ApplicationType(models.TextChoices):
    PROFILE = "Profil kandydata", "Profil kandydata"
    CV = "CV", "CV"


class ApplicationStatus(models.TextChoices):
    SUBMTTED = "Złożona", "Złożona"
    ACCEPTED = "Zaakceptowana", "Zaakceptowana"
    REJECTED = "Odrzucona", "Odrzucona"
