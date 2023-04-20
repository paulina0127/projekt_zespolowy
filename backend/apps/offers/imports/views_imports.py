from django.core.exceptions import PermissionDenied, ValidationError
from rest_framework import generics
from rest_framework.permissions import (
    DjangoModelPermissions,
    DjangoModelPermissionsOrAnonReadOnly,
)

from ...core.utils.permissions import (
    IsCandidateObjectOwnerOrCompanyReadOnly,
    IsCompanyObjectOwnerOrAnonReadOnly,
    IsCandidateViewOwnerOrCompanyReadOnly,
)
from ..models import Application, Candidate, Company, Offer, Requirement, Attachment
from ..utils.filters import OfferFilter, ApplicationFilter
from ..utils.serializers import (
    ApplicationSerializer,
    CompanyApplicationSerializer,
    CreateApplicationSerializer,
    CreateOfferSerializer,
    OfferSerializer,
    RequirementSerializer,
    AttachmentSerializer,
    CreateAttachmentSerializer,
)
from apps.users.utils.choices import UserType
