from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField
from multiselectfield import MultiSelectField
from django_better_admin_arrayfield.models.fields import ArrayField


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Users require an email field')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'auth_user'
        verbose_name = "Użytkownik"
        verbose_name_plural = "Użytkownicy"


class Location(models.Model):
    street_address = models.CharField(verbose_name="Ulica", max_length=100)
    postal_code = models.CharField(verbose_name="Kod pocztowy", max_length=6)
    city = models.CharField(verbose_name="Miejscowość", max_length=100)

    class Meta:
        verbose_name = 'Lokalizacja'
        verbose_name_plural = 'Lokalizacje'

    def __str__(self) -> str:
        return self.street_address + ", " + self.postal_code + " " + self.city


class Skill(models.Model):
    # Type choices
    LANGUAGE = "Język"
    SOFT_SKILL = "Umiejętność miękka"
    HARD_SKILL = "Umiejętność twarda"
    OTHER = "Inny"
    TYPE = ((LANGUAGE, "Język"), (SOFT_SKILL,
                                  "Umiejętność miękka"), (HARD_SKILL, "Umiejętność twarda"), (OTHER, "Inna"))

    # Fields
    type = models.CharField(verbose_name="Rodzaj", max_length=50, choices=TYPE)
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


class Company(models.Model):
    nip = models.CharField(verbose_name="NIP", max_length=10, unique=True)
    name = models.CharField(verbose_name="Nazwa firmy", max_length=255)
    email = models.EmailField()
    phone_number = PhoneNumberField(verbose_name="Numer telefonu")
    website = models.URLField(verbose_name="Strona", blank=True, null=True)
    description = models.TextField(verbose_name="Opis")
    image = models.ImageField(verbose_name="Zdjęcie",
                              upload_to="/files/companies/images", blank=True, null=True)
    location = models.OneToOneField(verbose_name="Lokalizacja",
                                    to=Location, related_name='companies', on_delete=models.CASCADE)
    user = models.OneToOneField(verbose_name="Konto",
                                to=User, related_name='profile', on_delete=models.CASCADE)
    auto_verify = models.BooleanField(verbose_name="Automatyczna weryfikacja")

    class Meta:
        verbose_name = 'Pracodawca'
        verbose_name_plural = 'Pracodawcy'

    def __str__(self) -> str:
        return self.name


class Offer(models.Model):
    # Position level choices
    INTERN = "Praktykant/stażysta"
    ASSISTANT = "Asystent"
    JUNIOR = "Młodszy specjalista"
    MID = "Specjalista"
    SENIOR = "Starszy specjalista"
    EXPERT = "Ekspert/lider"
    SUPERVISOR = "Kierownik"
    MANAGER = "Menedżer"
    DIRECTOR = "Dyrektor/prezes"
    WORKER = "Pracownik fizyczny"

    POSITION_LEVEL = ((INTERN, "Praktykant / Stażysta"), (ASSISTANT, "Asystent"), (JUNIOR, "Młodszy specjalista (Junior)"), (MID, "Specjalista (Mid / Regular)"),
                      (SENIOR, "Starszy specjalista (Senior)"), (EXPERT, "Ekspert / Lider"), (SUPERVISOR, "Kierownik"), (MANAGER, "Menedżer"), (DIRECTOR, "Dyrektor / Prezes"), (WORKER, "Pracownik fizyczny"))

    # Contract type choices
    EMPLOYMENT_CONTRACT = "Umowa o pracę"
    CIVIL_CONTRACT = "Umowa zlecenie"
    COMMISSION_CONTRACT = "Umowa o dzieło"
    TEMPORARY_CONTRACT = "Umowa o pracę tymczasową"
    REPLACEMENT_CONTRACT = "Umowa na zastępstwo"
    AGENCY_CONTRACT = "Umowa agencyjna"
    B2B_CONTRACT = "Kontrakt B2B"
    INTERNSHIP_CONTRACT = "Staż/praktyka"

    CONTRACT_TYPE = ((EMPLOYMENT_CONTRACT, "Umowa o pracę"), (CIVIL_CONTRACT, "Umowa zlecenie"), (COMMISSION_CONTRACT, "Umowa o dzieło"), (TEMPORARY_CONTRACT, "Umowa o pracę tymczasową"),
                     (REPLACEMENT_CONTRACT, "Umowa na zastępstwo"), (AGENCY_CONTRACT, "Umowa agencyjna"), (B2B_CONTRACT, "Kontrakt b2b"), (INTERNSHIP_CONTRACT, "Staż / Praktyka"))

    # Working mode choices
    REMOTE_WORK = "Praca zdalna"
    HYBRID_WORK = "Praca hybrydowa"
    STATIONARY_WORK = "Praca stacjonarna"
    MOBILE_WORK = "Praca mobilna"

    WORKING_MODE = ((REMOTE_WORK, "Praca zdalna"), (HYBRID_WORK, "Praca hybrydowa"),
                    (STATIONARY_WORK, "Praca stacjonarna"), (MOBILE_WORK, "Praca mobilna"))

    # Working time choices
    FULL_TIME = "Pełny etat"
    PART_TIME = "Część etatu"
    TEMPORARY_WORK = "Praca dodatkowa/tymczasowa"

    WORKING_TIME = ((FULL_TIME, "Pełny etat"), (PART_TIME, "Część etatu"),
                    (TEMPORARY_WORK, "Praca dodatkowa / tymczasowa"))

    # Fields
    position = models.CharField(verbose_name="Stanowisko", max_length=255)
    position_level = models.CharField(
        verbose_name="Poziom stanowiska", max_length=50, choices=POSITION_LEVEL)
    category = models.OneToOneField(verbose_name="Kategoria",
                                    to=Category, related_name='offers', on_delete=models.CASCADE)
    salary = models.CharField(
        verbose_name="Wynagrodzenie", max_length=50, blank=True, null=True)
    contract_type = MultiSelectField(
        verbose_name="Rodzaj umowy", choices=CONTRACT_TYPE, max_length=255)
    working_mode = MultiSelectField(
        verbose_name="Tryb pracy", choices=WORKING_MODE, max_length=255)
    working_time = MultiSelectField(
        verbose_name="Wymiar pracy", choices=WORKING_TIME, max_length=255)
    duties = ArrayField(models.TextField(), verbose_name="Obowiązki")
    advantages = ArrayField(
        models.TextField(), verbose_name="Zalety", blank=True, null=True)
    created_date = models.DateTimeField(
        verbose_name="Data utworzenia", auto_now_add=True)
    expiration_date = models.DateTimeField(verbose_name="Data wygaśnięcia")
    location = models.OneToOneField(verbose_name="Lokalizacja",
                                    to=Location, related_name='offers', on_delete=models.CASCADE)
    company = models.OneToOneField(verbose_name="Pracodawca",
                                   to=Company, related_name='offers', on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name="Aktualna")
    is_verified = models.BooleanField(verbose_name="Zweryfikowana")

    class Meta:
        verbose_name = 'Oferta'
        verbose_name_plural = 'Oferty'

    def __str__(self) -> str:
        return self.company.name + " " + self.position


class Requirement(models.Model):
    # Type choices
    LANGUAGE = "Język"
    SOFT_SKILL = "Umiejętność miękka"
    HARD_SKILL = "Umiejętność twarda"
    OTHER = "Inny"
    TYPE = ((LANGUAGE, "Język"), (SOFT_SKILL,
                                  "Umiejętność miękka"), (HARD_SKILL, "Umiejętność twarda"), (OTHER, "Inna"))

    # Fields
    type = models.CharField(verbose_name="Rodzaj",
                            max_length=50, choices=TYPE, blank=True)
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

    # def save(self, *args, **kwargs):
    #     if self.skill:
    #         self.type = self.skill.type
    #         self.name = self.skill.name
    #     super(Requirement, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return self.type + " " + self.name + ", " + self.level


class Candidate(models.Model):
    pesel = models.CharField(verbose_name="PESEL", max_length=11, unique=True)
    first_name = models.CharField(verbose_name="Imię", max_length=100)
    last_name = models.CharField(verbose_name="Nazwisko", max_length=100)
    phone_number = PhoneNumberField(verbose_name="Numer telefonu")
    image = models.ImageField(verbose_name="Zdjęcie",
                              upload_to="files/candidates/images", blank=True, null=True)
    location = models.OneToOneField(verbose_name="Lokalizacja",
                                    to=Location, related_name='candidates', on_delete=models.CASCADE)
    user = models.OneToOneField(verbose_name="Konto",
                                to=User, related_name='profiles', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Kandydat'
        verbose_name_plural = 'Kandydaci'

    def __str__(self) -> str:
        return self.first_name + " " + self.last_name


class File(models.Model):
    # Type choices
    CV = "cv"
    CERTIFICATE = "Certyfikat"
    REFERENCES = "Referencje"
    DIPLOMA = "Dyplom"
    COVER_LETTER = "List motywacyjny"
    OTHER = "Inny"

    TYPE = ((CV, "CV"), (CERTIFICATE, "Certyfikat"), (REFERENCES, "Referencje"),
            (DIPLOMA, "Dyplom"), (COVER_LETTER, "List motywacyjny"), (OTHER, "Inny"))

    # Fields
    name = models.CharField(verbose_name="Nazwa", max_length=255)
    added_at = models.DateTimeField(
        verbose_name="Data dodania", auto_now_add=True)
    type = models.CharField(verbose_name="Rodzaj", max_length=50, choices=TYPE)
    file = models.FileField(verbose_name="Plik",
                            upload_to="files/candidates/attachments")
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


class Education(models.Model):
    # Education level choices
    PRIMARY = "Podstawowe"
    MIDDLE = "Zawodowe"
    SECONDARY = "Średnie"
    BACHELOR = "Licencjat"
    ENGINEER = "Inżynier"
    MASTER = "Magister"
    MASTER_ENGINEER = "Magister inżynier"
    DOCTOR = "Doktor"
    POSTDOCTOR = "Doktor habilitowany"
    PROFESSOR = "Profesor"
    POSTGRAD = "Studia podyplomowe"
    MEDICINE_PHYSICIAN = "Lekarz medycyny"

    EDUCATION_LEVEL = ((PRIMARY, "Podstawowe"), (MIDDLE, "Zawodowe"), (SECONDARY, "Średnie"), (BACHELOR, "Licencjat"), (ENGINEER, "Inżynier"), (MASTER, "Magister"), (MASTER_ENGINEER,
                       "Magister inżynier"), (DOCTOR, "Doktor"), (POSTDOCTOR, "Doktor habilitowany"), (PROFESSOR, "Profesor"), (POSTGRAD, "Studia podyplomowe"), (MEDICINE_PHYSICIAN, "Lekarz medycyny"))

    # Fields
    institute = models.CharField(verbose_name="Uczelnia", max_length=255)
    education_level = models.CharField(verbose_name="Poziom wykształcenia",
                                       max_length=50, choices=EDUCATION_LEVEL)
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


class CSkill(models.Model):
    # Type choices
    LANGUAGE = "Język"
    SOFT_SKILL = "Umiejętność miękka"
    HARD_SKILL = "Umiejętność twarda"
    OTHER = "Inny"
    TYPE = ((LANGUAGE, "Język"), (SOFT_SKILL,
                                  "Umiejętność miękka"), (HARD_SKILL, "Umiejętność twarda"), (OTHER, "Inna"))

    # Fields
    type = models.CharField("Rodzaj", max_length=50, choices=TYPE, blank=True)
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

    def save(self, *args, **kwargs):
        if self.skill:
            self.type = self.skill.type
            self.name = self.skill.name
        super(CSkill, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return self.type + " " + self.name


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


class Link(models.Model):
    # Type choices
    PORTFOLIO = "Portfolio"
    PERSONAL_WEBSITE = "Strona osobista"
    COMPANY_WEBSITE = "Strona firmowa"
    PROJECT = "Projekt"
    SOCIAL_MEDIA = "Profil społecznościowy"
    OTHER = "Inny"

    TYPE = ((PORTFOLIO, "Portfolio"), (PERSONAL_WEBSITE, "Strona osobista"), (COMPANY_WEBSITE, "Strona firmowa"),
            (PROJECT, "Projekt"), (SOCIAL_MEDIA, "Profil społecznościowy"), (OTHER, "Inny"))

    # Fields
    type = models.CharField(verbose_name="Rodzaj", max_length=50, choices=TYPE)
    url = models.URLField(verbose_name="Adres URL")
    candidate = models.ForeignKey(verbose_name="Kandydat",
                                  to=Candidate, related_name='links', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Link'
        verbose_name_plural = 'Linki'


class Application(models.Model):
    # Type choices
    PROFILE = "Profil kandydata"
    CV = "CV"
    TYPE = ((PROFILE, "Profil kandydata"), (CV, "CV"))

    # Status choices
    SUBMTTED = "Złożona"
    ACCEPTED = "Zaakceptowana"
    REJECTED = "Odrzucona"
    STATUS = ((SUBMTTED, "Złożona"), (ACCEPTED, "Zaakceptowana"),
              (REJECTED, "Odrzucona"))

    # Fields
    date = models.DateTimeField(verbose_name="Data złożenia", blank=True)
    type = models.CharField(verbose_name="Typ", max_length=50, choices=TYPE)
    status = models.CharField(verbose_name="Status",
                              max_length=50, choices=STATUS, blank=True)
    mark = models.IntegerField(
        verbose_name="Ocena kompetencji", blank=True, null=True)
    notes = models.TextField(verbose_name="Notatki", blank=True, null=True)
    candidate = models.OneToOneField(verbose_name="Kandydat",
                                     to=Candidate, related_name='applications', on_delete=models.CASCADE)
    offer = models.ForeignKey(verbose_name="Oferta",
                              to=Offer, related_name='applications', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Aplikacja'
        verbose_name_plural = 'Aplikacje'

    def save(self, *args, **kwargs):
        if not self.status:
            self.status = "Złożona"
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
