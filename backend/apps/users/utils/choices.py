from django.db import models
from django.utils.translation import gettext_lazy as _


class UserType(models.TextChoices):
    CANDIDATE = "Kandydat", _("Kandydat")
    COMPANY = "Pracodawca", _("Pracodawca")
    ADMIN = "Admin", _("Admin")
