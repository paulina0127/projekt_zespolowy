from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import Group

from .choices import UserType


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, type, password, **extra_fields):
        if not email:
            raise ValueError("Users require an email field")
        email = self.normalize_email(email)
        user = self.model(email=email, type=type, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        group = Group.objects.get(name=type)
        user.groups.add(group)
        return user

    def create_user(self, email, type, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, type, password, **extra_fields)

    def _create_superuser(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Users require an email field")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        group = Group.objects.get(name=UserType.ADMIN)
        user.groups.add(group)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("type", UserType.ADMIN)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_superuser(email, password, **extra_fields)
