from django.utils.translation import gettext_lazy as _

from .imports.models_imports import *


class Company(models.Model):
    nip = models.CharField(
        verbose_name=_("NIP"), max_length=10, unique=True, validators=[validate_nip]
    )
    name = models.CharField(verbose_name=_("Nazwa firmy"), max_length=255)
    email = models.EmailField()
    phone_number = PhoneNumberField(verbose_name=_("Numer telefonu"))
    location = models.OneToOneField(
        verbose_name=_("Lokalizacja"),
        to=Location,
        related_name="company",
        on_delete=models.CASCADE,
    )
    website = models.URLField(verbose_name=_("Strona internetowa"), blank=True)
    description = models.TextField(verbose_name=_("Opis"))
    image = models.ImageField(
        verbose_name=_("Zdjęcie"),
        upload_to="companies/images",
        blank=True,
        default="companies/images/placeholder.png",
    )

    user = models.OneToOneField(
        verbose_name=_("Użytkownik"),
        to=User,
        related_name="company_profile",
        on_delete=models.CASCADE,
    )
    auto_verify = models.BooleanField(
        verbose_name=_("Automatyczna weryfikacja"), default=False
    )

    class Meta:
        verbose_name = _("Pracodawca")
        verbose_name_plural = _("Pracodawcy")
        ordering = ["id"]

    def __str__(self) -> str:
        return self.name

    def delete(self, *args, **kwargs):
        # Delete related location when company is deleted
        if self.location:
            self.location.delete()
        super().delete(*args, **kwargs)


class Candidate(models.Model):
    pesel = models.CharField(
        verbose_name=_("PESEL"), max_length=11, unique=True, validators=[validate_pesel]
    )
    first_name = models.CharField(verbose_name=_("Imię"), max_length=100)
    last_name = models.CharField(verbose_name=_("Nazwisko"), max_length=100)
    phone_number = PhoneNumberField(verbose_name=_("Numer telefonu"))
    location = models.OneToOneField(
        verbose_name=_("Lokalizacja"),
        to=Location,
        related_name="candidate",
        on_delete=models.CASCADE,
    )

    image = models.ImageField(
        verbose_name=_("Zdjęcie"),
        upload_to="candidates/images",
        blank=True,
        default="candidates/images/placeholder.png",
    )

    user = models.OneToOneField(
        verbose_name=_("Użytkownik"),
        to=User,
        related_name="candidate_profile",
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Kandydat")
        verbose_name_plural = _("Kandydaci")
        ordering = ["id"]

    def __str__(self) -> str:
        return self.first_name + " " + self.last_name

    def delete(self, *args, **kwargs):
        # Delete related location when candidate is deleted
        if self.location:
            self.location.delete()
        super().delete(*args, **kwargs)


class File(models.Model):
    name = models.CharField(verbose_name=_("Nazwa"), max_length=255)
    added_at = models.DateTimeField(verbose_name=_("Dodano"), auto_now_add=True)
    type = models.CharField(
        verbose_name=_("Rodzaj"), max_length=50, choices=FileType.choices
    )
    path = models.FileField(
        verbose_name=_("Plik"),
        upload_to="candidates/files",
        validators=[validate_file_extension],
    )
    candidate = models.ForeignKey(
        verbose_name=_("Kandydat"),
        to=Candidate,
        related_name="files",
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Plik")
        verbose_name_plural = _("Pliki")
        ordering = ["id"]

    def __str__(self) -> str:
        return self.name


class Experience(models.Model):
    position = models.CharField(verbose_name=_("Stanowisko"), max_length=255)
    company = models.CharField(verbose_name=_("Nazwa firmy"), max_length=255)
    location = models.OneToOneField(
        verbose_name=_("Lokalizacja"),
        to=Location,
        related_name="experience",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    start_date = models.DateField(verbose_name=_("Data rozpoczęcia"))
    end_date = models.DateField(
        verbose_name=_("Data zakończenia"), blank=True, null=True
    )
    duties = ArrayField(models.TextField(), verbose_name=_("Obowiązki"), blank=True)
    candidate = models.ForeignKey(
        verbose_name=_("Kandydat"),
        to=Candidate,
        related_name="experience",
        on_delete=models.CASCADE,
    )
    references = models.OneToOneField(
        verbose_name=_("Referencje"),
        to=File,
        related_name="experience",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    is_current = models.BooleanField(verbose_name=_("Aktualne"))

    class Meta:
        verbose_name = _("Doświadczenie")
        verbose_name_plural = _("Doświadczenie")
        ordering = ["id"]

    def __str__(self) -> str:
        return self.company + ", " + self.position

    def clean(self):
        validate_start_date(self)
        validate_end_date(self)


class Education(models.Model):
    institute = models.CharField(verbose_name=_("Uczelnia"), max_length=255)
    education_level = models.CharField(
        verbose_name=_("Poziom wykształcenia"),
        max_length=50,
        choices=EducationLevel.choices,
    )
    major = models.CharField(_("Kierunek"), max_length=255, blank=True)
    start_date = models.DateField(verbose_name=_("Data rozpoczęcia"))
    end_date = models.DateField(
        verbose_name=_("Data zakończenia"), blank=True, null=True
    )
    candidate = models.ForeignKey(
        verbose_name=_("Kandydat"),
        to=Candidate,
        related_name="education",
        on_delete=models.CASCADE,
    )
    diploma = models.OneToOneField(
        verbose_name=_("Dyplom"),
        to=File,
        related_name="education",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    is_current = models.BooleanField(verbose_name=_("Aktualne"))

    class Meta:
        verbose_name = _("Wykształcenie")
        verbose_name_plural = _("Wykształcenie")
        ordering = ["id"]

    def __str__(self) -> str:
        if self.major:
            return self.institute + " " + self.major + ", " + self.education_level
        else:
            return self.institute + ", " + self.education_level

    def clean(self):
        validate_start_date(self)
        validate_end_date(self)


class CSkill(models.Model):
    type = models.CharField(
        verbose_name=_("Rodzaj"),
        max_length=50,
        choices=SkillType.choices,
        blank=True,
    )
    name = models.CharField(verbose_name=_("Nazwa"), max_length=255, blank=True)
    level = models.CharField(verbose_name=_("Poziom"), max_length=50, blank=True)
    candidate = models.ForeignKey(
        verbose_name=_("Kandydat"),
        to=Candidate,
        on_delete=models.CASCADE,
        related_name="skills",
    )
    skill = models.ForeignKey(
        verbose_name=_("Umiejętność"),
        to=Skill,
        related_name="cskills",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    certificate = models.OneToOneField(
        verbose_name=_("Certyfikat"),
        to=File,
        related_name="cskill",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = _("Umiejętność")
        verbose_name_plural = _("Umiejętności")
        ordering = ["id"]

    def __str__(self) -> str:
        if self.level:
            return self.type + " " + self.name + ", " + self.level
        else:
            return self.type + " " + self.name

    def clean(self):
        validate_cskill_name(self)

    def save(self, *args, **kwargs):
        # If skill is selected from catalog, fill in name
        if self.skill:
            self.name = self.skill.name
        super(CSkill, self).save(*args, **kwargs)


class Course(models.Model):
    name = models.CharField(verbose_name=_("Nazwa"), max_length=255)
    description = models.TextField(verbose_name=_("Opis"), blank=True)
    start_date = models.DateField(verbose_name=_("Data rozpoczęcia"))
    end_date = models.DateField(verbose_name=_("Data zakończenia"))
    candidate = models.ForeignKey(
        verbose_name=_("Kandydat"),
        to=Candidate,
        related_name="courses",
        on_delete=models.CASCADE,
    )
    certificate = models.OneToOneField(
        verbose_name=_("Certyfikat"),
        to=File,
        related_name="course",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = _("Kurs")
        verbose_name_plural = _("Kursy")
        ordering = ["id"]

    def __str__(self) -> str:
        return self.name

    def clean(self):
        validate_start_date(self)
        validate_end_date(self)


class Link(models.Model):
    type = models.CharField(
        verbose_name=_("Rodzaj"), max_length=50, choices=LinkType.choices
    )
    url = models.URLField(verbose_name=_("Adres URL"))
    candidate = models.ForeignKey(
        verbose_name=_("Kandydat"),
        to=Candidate,
        related_name="links",
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Link")
        verbose_name_plural = _("Linki")
        ordering = ["id"]

    def __str__(self) -> str:
        return self.url
