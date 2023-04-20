from django.db import models
from django.http import HttpResponseNotFound
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from apps.profiles.models import Company


class OfferQuerySet(models.QuerySet):
    def active_and_verified(self):
        # Filter the queryset to show only active offers
        return self.filter(expiration_date__gt=timezone.now(), is_verified=True)

    def for_user(self, user):
        # Filter the queryset to show only offers owned by the given user
        try:
            company = user.company_profile
            return self.filter(company=company)
        except Company.DoesNotExist:
            return HttpResponseNotFound(_("Ten użytkownik nie ma profilu pracodawcy."))


class OfferManager(models.Manager):
    def get_queryset(self):
        return OfferQuerySet(self.model, using=self._db)

    def active_and_verified(self):
        return self.get_queryset().active_and_verified()

    def for_user(self, user):
        return self.get_queryset().for_user(user)
