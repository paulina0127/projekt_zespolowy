from django.contrib.auth.models import AbstractUser, Group
from django.db import models

from .managers import UserManager
from .consts import *


class User(AbstractUser):
    username = None
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, default='Nowy użytkownik')
    is_active = models.BooleanField(default=True)
    
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name
    
    def __str__(self):
        return self.email

    class Meta:
        db_table = 'auth_user'
        verbose_name = USER
        verbose_name_plural = USERS


class Group(Group):  # Proxy model to display the default Group model in users page
    class Meta:
        proxy = True
        verbose_name = GROUP
        verbose_name_plural = GROUPS
