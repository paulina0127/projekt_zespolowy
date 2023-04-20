from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse

# Imports for ApiRoot
from apps.offers.views import OfferList, ApplicationList
from apps.profiles.views import CompanyList, CandidateList

from ..models import Category, Location, Skill
from ..utils.filters import CategoryFilter
from ..utils.serializers import (
    LocationSerializer,
    MainCategorySerializer,
    SkillSerializer,
)
