from django.contrib.auth.models import AbstractUser, Group
from django.db import models

from .managers import UserManager
from .consts import *


class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'auth_user'
        verbose_name = USER
        verbose_name_plural = USERS


class Group(Group):  # Proxy model to display the default Group model in users page
    class Meta:
        proxy = True
        verbose_name = GROUP
        verbose_name_plural = GROUPS
