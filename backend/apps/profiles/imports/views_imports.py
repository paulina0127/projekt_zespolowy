from django.core.exceptions import ValidationError
from rest_framework import generics, serializers
from rest_framework.permissions import (
    DjangoModelPermissions,
    DjangoModelPermissionsOrAnonReadOnly,
)

from apps.core.utils.permissions import (
    IsCandidateObjectOwnerOrCompanyReadOnly,
    IsCompanyObjectOwnerOrAnonReadOnly,
    IsCandidateViewOwnerOrCompanyReadOnly,
)

from ..models import (
    Candidate,
    Company,
    Course,
    CSkill,
    Education,
    Experience,
    File,
    Link,
)
from ..utils.filters import CompanyFilter
from ..utils.serializers import (
    CandidateSerializer,
    CompanySerializer,
    CourseSerializer,
    CreateCandidateSerializer,
    CreateCompanySerializer,
    CSkillSerializer,
    EducationSerializer,
    ExperienceSerializer,
    FileSerializer,
    LinkSerializer,
)
