from django.core.exceptions import BadRequest
from rest_framework import generics, serializers, status
from rest_framework.parsers import JSONParser, MultiPartParser
from rest_framework.permissions import (DjangoModelPermissions,
                                        DjangoModelPermissionsOrAnonReadOnly)
from rest_framework.response import Response

from apps.core.utils.pagination import SmallResultsPage
from apps.core.utils.permissions import (
    IsCandidateObjectOwnerOrCompanyReadOnly,
    IsCandidateViewOwnerOrCompanyReadOnly, IsCompanyObjectOwnerOrAnonReadOnly)

from ..models import (Candidate, Company, Course, CSkill, Education,
                      Experience, File, Link)
from ..utils.filters import CompanyFilter
from ..utils.serializers import (CandidateSerializer, CompanySerializer,
                                 CourseSerializer, CreateCandidateSerializer,
                                 CreateCompanySerializer, CSkillSerializer,
                                 EducationSerializer, ExperienceSerializer,
                                 FileSerializer, LinkSerializer)
