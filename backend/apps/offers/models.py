from django.utils.translation import gettext_lazy as _

from .imports.models_imports import *


class Offer(models.Model):
    position = models.CharField(verbose_name=_("Stanowisko"), max_length=255)
    position_level = models.CharField(
        verbose_name=_("Poziom stanowiska"),
        max_length=50,
        choices=PositionLevel.choices,
    )
    location = models.OneToOneField(
        verbose_name=_("Lokalizacja"),
        to=Location,
        related_name="offer",
        on_delete=models.CASCADE,
    )
    category = models.ForeignKey(
        verbose_name=_("Kategoria"),
        to=Category,
        related_name="offers",
        on_delete=models.CASCADE,
    )
    salary = models.CharField(
        verbose_name=_("Wynagrodzenie"),
        max_length=50,
        blank=True,
        validators=[validate_salary],
    )
    contract_type = ChoiceArrayField(
        verbose_name=_("Rodzaj umowy"),
        base_field=models.CharField(max_length=50, choices=ContractType.choices),
    )
    working_mode = ChoiceArrayField(
        verbose_name=_("Tryb pracy"),
        base_field=models.CharField(choices=WorkingMode.choices, max_length=255),
    )
    working_time = ChoiceArrayField(
        verbose_name=_("Wymiar pracy"),
        base_field=models.CharField(choices=WorkingTime.choices, max_length=255),
    )
    duties = ArrayField(models.TextField(), verbose_name=_("Obowiązki"))
    advantages = ArrayField(
        models.TextField(),
        verbose_name=_("Zalety"),
        blank=True,
    )
    created_date = models.DateTimeField(
        verbose_name=_("Data utworzenia"), auto_now_add=True
    )
    expiration_date = models.DateTimeField(
        verbose_name=_("Data wygaśnięcia"), validators=[validate_expiration_date]
    )

    company = models.ForeignKey(
        verbose_name=_("Pracodawca"),
        to=Company,
        related_name="offers",
        on_delete=models.CASCADE,
    )
    is_verified = models.BooleanField(verbose_name=_("Zweryfikowana"), default=False)
    objects = OfferManager()

    class Meta:
        verbose_name = _("Oferta")
        verbose_name_plural = _("Oferty")
        ordering = ["id"]

    def __str__(self) -> str:
        return self.company.name + " " + self.position

    def save(self, *args, **kwargs):
        # If the company has auto_verify set to True then the offer is automatically verified
        if self.company.auto_verify:
            self.is_verified = True
        else:
            # Check if the company has 5 verified offers and set auto_verify to True if it does
            count = Offer.objects.filter(company=self.company, is_verified=True).count()
            if count == 5:
                self.company.auto_verify = True
                self.company.save()
        super(Offer, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        # Delete related location when offer is deleted
        if self.location:
            self.location.delete()
        super().delete(*args, **kwargs)


class Requirement(models.Model):
    type = models.CharField(
        verbose_name=_("Rodzaj"), max_length=50, choices=SkillType.choices
    )
    name = models.CharField(verbose_name=_("Nazwa"), max_length=100, blank=True)
    level = models.CharField(verbose_name=_("Poziom"), max_length=50, blank=True)
    offer = models.ForeignKey(
        verbose_name=_("Oferta"),
        to=Offer,
        on_delete=models.CASCADE,
        related_name="requirements",
    )
    skill = models.ForeignKey(
        verbose_name=_("Umiejętność"),
        to=Skill,
        related_name="requirements",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = _("Wymaganie")
        verbose_name_plural = _("Wymagania")
        ordering = ["id"]

    def __str__(self) -> str:
        if self.level:
            return self.name + ", " + self.level
        else:
            return self.name

    def clean(self):
        validate_requirement_name(self)

    def save(self, *args, **kwargs):
        # If skill is selected from catalog, fill in name
        if self.skill:
            self.name = self.skill.name
        super(Requirement, self).save(*args, **kwargs)


class Application(models.Model):
    created_date = models.DateTimeField(
        auto_now_add=True, verbose_name=_("Data utworzenia"), blank=True
    )
    status = models.CharField(
        verbose_name=_("Status"),
        max_length=50,
        choices=ApplicationStatus.choices,
        blank=True,
    )
    type = models.CharField(
        verbose_name=_("Rodzaj"), max_length=50, choices=ApplicationType.choices
    )
    mark = models.IntegerField(
        verbose_name=_("Ocena kompetencji"),
        blank=True,
        null=True,
        validators=[validate_mark_range],
    )
    notes = models.TextField(verbose_name=_("Notatki"), blank=True)
    candidate = models.ForeignKey(
        verbose_name=_("Kandydat"),
        to=Candidate,
        related_name="applications",
        on_delete=models.CASCADE,
    )
    offer = models.ForeignKey(
        verbose_name=_("Oferta"),
        to=Offer,
        related_name="applications",
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Aplikacja")
        verbose_name_plural = _("Aplikacje")
        ordering = ["id"]

    def __str__(self) -> str:
        return "Id: " + str(self.id)

    def clean(self):
        validate_unique_application(self, Application)

    def save(self, *args, **kwargs):
        # Set status to submitted at create
        if not self.status:
            self.status = ApplicationStatus.SUBMTTED
        super(Application, self).save(*args, **kwargs)


class Attachment(models.Model):
    application = models.ForeignKey(
        verbose_name=_("Aplikacja"),
        to=Application,
        related_name="attachments",
        on_delete=models.CASCADE,
    )
    file = models.ForeignKey(
        verbose_name=_("Plik"),
        to=File,
        related_name="attachments",
        on_delete=models.CASCADE,
    )

    class Meta:
        verbose_name = _("Załącznik")
        verbose_name_plural = _("Załączniki")
        ordering = ["id"]

    def __str__(self) -> str:
        return "Id: " + str(self.id)

    def clean(self):
        validate_unique_attachment(self, Attachment)
