from rest_framework import generics, permissions
from ..models import Offer
from ..utils.serializers import OfferSerializer
from ..utils.filters import OfferFilter
from ...core.utils.permissions import IsCompanyOwner, IsCompany
from django.utils import timezone
