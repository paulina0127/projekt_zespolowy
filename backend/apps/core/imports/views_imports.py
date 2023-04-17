from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
from ..models import Category, Location, Skill
from ..utils.filters import CategoryFilter
from ..utils.serializers import (CategorySerializer, LocationSerializer,
                                 SkillSerializer)

# imports for ApiRoot
from apps.offers.views import OfferList
from apps.profiles.views import CompanyList
