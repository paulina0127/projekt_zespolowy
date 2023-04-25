from django.core.exceptions import PermissionDenied, ValidationError
from rest_framework import generics
from rest_framework.permissions import (DjangoModelPermissions,
                                        DjangoModelPermissionsOrAnonReadOnly)

from apps.core.utils.pagination import SmallResultsPage
from apps.users.utils.choices import UserType

from ...core.utils.permissions import (IsCandidateObjectOwnerOrCompanyReadOnly,
                                       IsCandidateViewOwnerOrCompanyReadOnly,
                                       IsCompanyObjectOwnerOrAnonReadOnly)
from ..models import (Application, Attachment, Candidate, Company, Offer,
                      Requirement)
from ..utils.filters import ApplicationFilter, OfferFilter
from ..utils.serializers import (ApplicationSerializer, AttachmentSerializer,
                                 CompanyApplicationSerializer,
                                 CreateApplicationSerializer,
                                 CreateAttachmentSerializer,
                                 CreateOfferSerializer, OfferSerializer,
                                 RequirementSerializer)
