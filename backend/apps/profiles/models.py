from django.db import models
from django_better_admin_arrayfield.models.fields import ArrayField
from phonenumber_field.modelfields import PhoneNumberField

from apps.core.models import Location, Skill
from apps.users.models import User

from .choices import SkillType, FileType, EducationLevel, LinkType
from .consts import *
from .validators import *


class Company(models.Model):
    nip = models.CharField(verbose_name=NIP, max_length=10, unique=True)
    name = models.CharField(verbose_name=COMPANY_NAME, max_length=255)
    email = models.EmailField()
    phone_number = PhoneNumberField(verbose_name=PHONE_NUMBER)
    location = models.OneToOneField(verbose_name=LOCATION,
                                    to=Location, related_name='companies', on_delete=models.CASCADE)
    website = models.URLField(verbose_name=WEBSITE, blank=True, null=True)
    description = models.TextField(verbose_name=DESCRIPTION)
    image = models.ImageField(verbose_name=IMAGE,
                              upload_to="companies/images", blank=True, null=True)

    user = models.OneToOneField(verbose_name=USER,
                                to=User, related_name='company_profile', on_delete=models.CASCADE)
    auto_verify = models.BooleanField(verbose_name=AUTO_VERIFY)

    class Meta:
        verbose_name = COMPANY
        verbose_name_plural = COMPANIES

    def __str__(self) -> str:
        return self.name


class Candidate(models.Model):
    pesel = models.CharField(verbose_name=PESEL, max_length=11, unique=True)
    first_name = models.CharField(verbose_name=FIRST_NAME, max_length=100)
    last_name = models.CharField(verbose_name=LAST_NAME, max_length=100)
    phone_number = PhoneNumberField(verbose_name=PHONE_NUMBER)
    location = models.OneToOneField(verbose_name=LOCATION,
                                    to=Location, related_name='candidates', on_delete=models.CASCADE)

    image = models.ImageField(
        verbose_name=IMAGE, upload_to="candidates/images", blank=True, null=True)

    user = models.OneToOneField(verbose_name=User,
                                to=User, related_name='candidate_profile', on_delete=models.CASCADE)

    class Meta:
        verbose_name = CANDIDTE
        verbose_name_plural = CANDIDATES

    def __str__(self) -> str:
        return self.first_name + " " + self.last_name


class File(models.Model):
    name = models.CharField(verbose_name=FILE_NAME, max_length=255)
    added_at = models.DateTimeField(
        verbose_name=ADDED_AT, auto_now_add=True)
    type = models.CharField(verbose_name=FILE_TYPE,
                            max_length=50, choices=FileType.choices)
    file = models.FileField(verbose_name=FILE,
                            upload_to="candidates/attachments")
    candidate = models.ForeignKey(verbose_name=CANDIDTE,
                                  to=Candidate, related_name='files', on_delete=models.CASCADE)

    class Meta:
        verbose_name = FILE
        verbose_name_plural = FILES

    def __str__(self) -> str:
        return self.name


class Experience(models.Model):
    position = models.CharField(verbose_name=POSITION, max_length=255)
    company = models.CharField(verbose_name=COMPANY_NAME, max_length=255)
    location = models.OneToOneField(verbose_name=LOCATION,
                                    to=Location, related_name='experience', on_delete=models.CASCADE, blank=True, null=True)
    start_date = models.DateField(verbose_name=START_DATE)
    end_date = models.DateField(
        verbose_name=END_DATE, blank=True, null=True)
    duties = ArrayField(
        models.TextField(), verbose_name=DUTIES, blank=True, null=True)
    candidate = models.ForeignKey(verbose_name=CANDIDATE,
                                  to=Candidate, related_name='experience', on_delete=models.CASCADE)
    references = models.OneToOneField(verbose_name=REFERENCES,
                                      to=File, related_name='references', on_delete=models.CASCADE, blank=True, null=True)
    is_current = models.BooleanField(
        verbose_name=IS_CURRENT)

    class Meta:
        verbose_name = EXPERIENCE
        verbose_name_plural = EXPERIENCES

    def __str__(self) -> str:
        return self.company + ", " + self.position


class Education(models.Model):
    institute = models.CharField(verbose_name=INSTITUTE, max_length=255)
    education_level = models.CharField(verbose_name=EDUCATION_LEVEL,
                                       max_length=50, choices=EducationLevel.choices)
    major = models.CharField(
        MAJOR, max_length=255)
    start_date = models.DateField(verbose_name=START_DATE)
    end_date = models.DateField(
        verbose_name=END_DATE, blank=True, null=True)
    candidate = models.ForeignKey(verbose_name=CANDIDATE,
                                  to=Candidate, related_name='education', on_delete=models.CASCADE)
    diploma = models.OneToOneField(verbose_name=DIPLOMA,
                                   to=File, related_name='diplomas', on_delete=models.CASCADE, blank=True, null=True)
    is_current = models.BooleanField(
        verbose_name=IS_CURRENT)

    class Meta:
        verbose_name = EDUCATION
        verbose_name_plural = EDUCATIONS

    def __str__(self) -> str:
        return self.institute + " " + self.major + ", " + self.education_level


class CSkill(models.Model):
    type = models.CharField(verbose_name=SKILL_TYPE, max_length=50,
                            choices=SkillType.choices, blank=True)
    name = models.CharField(verbose_name=SKILL_NAME,
                            max_length=255, blank=True)
    level = models.CharField(
        verbose_name=LEVEL, max_length=50, blank=True, null=True)
    candidate = models.ForeignKey(verbose_name=CANDIDATE,
                                  to=Candidate, on_delete=models.CASCADE, related_name='skills')
    skill = models.ForeignKey(verbose_name=SKILL,
                              to=Skill, related_name='skills', on_delete=models.CASCADE, blank=True, null=True)
    certificate = models.OneToOneField(verbose_name=CERTIFICATE,
                                       to=File, related_name='skill_certificates', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = SKILL
        verbose_name_plural = SKILLS

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
    name = models.CharField(verbose_name=COURSE_NAME, max_length=255)
    description = models.TextField(
        verbose_name=DESCRIPTION, blank=True, null=True)
    start_date = models.DateField(verbose_name=START_DATE)
    end_date = models.DateField(verbose_name=END_DATE)
    candidate = models.ForeignKey(verbose_name=CANDIDATE,
                                  to=Candidate, related_name='courses', on_delete=models.CASCADE)
    certificate = models.OneToOneField(verbose_name=CERTIFICATE,
                                       to=File, related_name='certificates', on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name = COURSE
        verbose_name_plural = COURSES

    def __str__(self) -> str:
        return self.name


class Link(models.Model):
    type = models.CharField(verbose_name=LINK_TYPE,
                            max_length=50, choices=LinkType.choices)
    url = models.URLField(verbose_name=URL)
    candidate = models.ForeignKey(verbose_name=CANDIDATE,
                                  to=Candidate, related_name='links', on_delete=models.CASCADE)

    class Meta:
        verbose_name = LINK
        verbose_name_plural = LINKS

    def __str__(self) -> str:
        return self.url
