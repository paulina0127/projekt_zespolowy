from django.db import models
from django_better_admin_arrayfield.models.fields import ArrayField

from apps.core.models import Location, Skill, Category
from apps.profiles.models import Company, Candidate, File

from .choices import SkillType, PositionLevel, ContractType, WorkingMode, WorkingTime, ApplicationStatus, ApplicationType
from .fields import ChoiceArrayField
from .consts import *
from .validators import *


class Offer(models.Model):
    position = models.CharField(verbose_name=POSITION, max_length=255)
    position_level = models.CharField(
        verbose_name=POSITION_LEVEL, max_length=50, choices=PositionLevel.choices)
    location = models.OneToOneField(verbose_name=LOCATION,
                                    to=Location, related_name='offers', on_delete=models.CASCADE)
    category = models.ForeignKey(verbose_name=CATEGORY,
                                 to=Category, related_name='offers', on_delete=models.CASCADE)
    salary = models.CharField(
        verbose_name=SALARY, max_length=50, blank=True, null=True)
    contract_type = ChoiceArrayField(verbose_name=CONTRACT_TYPE, base_field=models.CharField(
        max_length=50, choices=ContractType.choices))
    working_mode = ChoiceArrayField(
        verbose_name=WORKING_MODE, base_field=models.CharField(choices=WorkingMode.choices, max_length=255))
    working_time = ChoiceArrayField(
        verbose_name=WORKING_TIME, base_field=models.CharField(choices=WorkingTime.choices, max_length=255))
    duties = ArrayField(models.TextField(), verbose_name=DUTIES)
    advantages = ArrayField(
        models.TextField(), verbose_name=ADVANTAGES, blank=True, null=True)
    created_date = models.DateTimeField(
        verbose_name=CREATED_DATE, auto_now_add=True)
    expiration_date = models.DateTimeField(verbose_name=EXPIRATION_DATE)

    company = models.ForeignKey(verbose_name=COMPANY,
                                to=Company, related_name='offers', on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name=IS_ACTIVE)
    is_verified = models.BooleanField(verbose_name=IS_VERIFIED)

    class Meta:
        verbose_name = OFFER
        verbose_name_plural = OFFERS

    def __str__(self) -> str:
        return self.company.name + " " + self.position

    def save(self, *args, **kwargs):
        # If the company has auto_verify set to True then the offer is automatically verified
        if self.company.auto_verify:
            self.is_verified = True
        super(Offer, self).save(*args, **kwargs)


class Requirement(models.Model):
    type = models.CharField(verbose_name=TYPE,
                            max_length=50, choices=SkillType.choices, blank=True)
    name = models.CharField(verbose_name=NAME, max_length=100, blank=True)
    level = models.CharField(verbose_name=LEVEL,
                             max_length=50, blank=True, null=True)
    offer = models.ForeignKey(verbose_name=OFFER,
                              to=Offer, on_delete=models.CASCADE, related_name='requirements')
    skill = models.ForeignKey(verbose_name=SKILL,
                              to=Skill, related_name='requirements', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = REQUIREMENT
        verbose_name_plural = REQUIREMENTS

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
        auto_now_add=True, verbose_name=DATE, blank=True)
    status = models.CharField(verbose_name=APPLICATION_STATUS,
                              max_length=50, choices=ApplicationStatus.choices, blank=True)
    type = models.CharField(
        verbose_name=APPLICATION_TYPE, max_length=50, choices=ApplicationType.choices)
    mark = models.IntegerField(
        verbose_name=MARK, blank=True, null=True)
    notes = models.TextField(verbose_name=NOTES, blank=True, null=True)
    candidate = models.ForeignKey(verbose_name=CANDIATE,
                                  to=Candidate, related_name='applications', on_delete=models.CASCADE)
    offer = models.ForeignKey(verbose_name=OFFER,
                              to=Offer, related_name='applications', on_delete=models.CASCADE)

    class Meta:
        verbose_name = APPLICATION
        verbose_name_plural = APPLICATIONS

    # Set status to submitted at create
    def save(self, *args, **kwargs):
        if not self.status:
            self.status = ApplicationStatus.SUBMTTED
        super(Application, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return "Id: " + str(self.id)


class Attachment(models.Model):
    application = models.ForeignKey(verbose_name=APPLICATION,
                                    to=Application, related_name='attachments', on_delete=models.CASCADE)
    file = models.ForeignKey(verbose_name=FILE,
                             to=File, related_name='attachments', on_delete=models.CASCADE)

    class Meta:
        verbose_name = ATTACHMENT
        verbose_name_plural = ATTACHMENTS

    def __str__(self) -> str:
        return "Id: " + str(self.id)
