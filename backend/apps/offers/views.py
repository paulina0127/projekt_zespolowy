from django.utils.translation import gettext_lazy as _

from .imports.views_imports import *


# Display list to everyone and create a new offer
class OfferList(generics.ListCreateAPIView):
    name = "offers"
    filterset_class = OfferFilter
    search_fields = ["position", "company__name"]
    ordering_fields = ["id", "created_date", "expiration_date"]
    pagination_class = SmallResultsPage
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]

    def get_queryset(self):
        user = self.request.user
        # Filters for returning all offers to company
        all_offers = self.request.query_params.get("all", False)
        company = self.request.query_params.get("company", "")

        # Return all ofers for company
        if user.is_anonymous:
            # Default queryset
            queryset = Offer.objects.active_and_verified()
        elif user.is_authenticated and all_offers and company:
            # Check if user has company profile
            try:
                Company.objects.get(user=user)
            except Company.DoesNotExist:
                raise BadRequest(_("Użytkownik nie ma profilu pracodawcy."))
            else:
                if company == str(user.company_profile.id):
                    queryset = Offer.objects.for_user(user)
                else:
                    # Return 403 if user is trying to access not their offers
                    raise PermissionDenied()
        else:
            # Default queryset
            queryset = Offer.objects.active_and_verified()

        return queryset

    def get_serializer_class(self):
        # Return serializer for displaying offers if method is GET
        if self.request.method == "GET":
            return OfferSerializer
        # Return serializer for creating offers if method is POST
        elif self.request.method == "POST":
            return CreateOfferSerializer
        else:
            return OfferSerializer  # Default serializer class

    # Set company as current user's company profile on save
    def perform_create(self, serializer):
        user = self.request.user
        try:
            Company.objects.get(user=user)
        except Company.DoesNotExist:
            # Throw error if user doesn't have company profile
            raise BadRequest(_("Użytkownik nie ma profilu pracodawcy."))
        else:
            company = user.company_profile
            serializer.save(company=company).clean()


# Display a single offer
class OfferDetail(generics.RetrieveUpdateDestroyAPIView):
    name = "offer"
    permission_classes = [
        DjangoModelPermissionsOrAnonReadOnly,
        IsCompanyObjectOwnerOrAnonReadOnly,
    ]

    def get_queryset(self):
        user = self.request.user
        offer = self.kwargs["pk"]

        if user.is_anonymous:
            # Default queryset
            queryset = Offer.objects.active_and_verified()
        # Return all ofers for company
        elif user.is_authenticated:
            # Check if user has company profile
            try:
                Company.objects.get(user=user)
            except Company.DoesNotExist:
                queryset = Offer.objects.active_and_verified()
            else:
                # If user is offer owner return all offers
                queryset = Offer.objects.for_user(user).filter(id=offer)
                # If user isn't offer owner return default queryset
                if not queryset.exists():
                    queryset = Offer.objects.active_and_verified()

        else:
            # Default queryset
            queryset = Offer.objects.active_and_verified()

        return queryset

    def get_serializer_class(self):
        # Return serializer for displaying offers if method is GET
        if self.request.method == "GET":
            return OfferSerializer
        # Return serializer for creating offers if method is PUT
        elif self.request.method == "PUT":
            return CreateOfferSerializer
        else:
            return OfferSerializer  # Default serializer class


# Display list of requirements
class RequirementList(generics.ListCreateAPIView):
    serializer_class = RequirementSerializer
    name = "requirements"
    permission_classes = [
        DjangoModelPermissionsOrAnonReadOnly,
    ]

    def get_queryset(self):
        offer = self.kwargs["offer"]
        return Requirement.objects.filter(offer=offer)


# Display single requirement
class RequirementDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Requirement.objects.all()
    serializer_class = RequirementSerializer
    name = "requirement"
    permission_classes = [DjangoModelPermissions, IsCompanyObjectOwnerOrAnonReadOnly]


# Display list to everyone and create a new offer
class ApplicationList(generics.ListCreateAPIView):
    serializer_class = ApplicationSerializer
    name = "applications"
    filterset_class = ApplicationFilter
    search_fields = [
        "candidate__first_name",
        "candidate__last_name",
        "offer__position",
        "offer__company__name",
    ]
    ordering_fields = ["id", "created_date"]
    pagination_class = SmallResultsPage
    permission_classes = [DjangoModelPermissions]

    def get_queryset(self):
        user = self.request.user

        # Return all applications for candidate
        if user.is_authenticated:
            if user.type == UserType.CANDIDATE:
                try:
                    Candidate.objects.get(user=user)
                except Candidate.DoesNotExist:
                    queryset = Application.objects.none()
                else:
                    queryset = Application.objects.filter(
                        candidate=user.candidate_profile
                    )
            # Return all applications for company
            elif user.type == UserType.COMPANY:
                try:
                    Company.objects.get(user=user)
                except Company.DoesNotExist:
                    queryset = Application.objects.none()
                else:
                    queryset = Application.objects.filter(
                        offer__company=user.company_profile
                    )
            elif user.type == UserType.ADMIN:
                queryset = Application.objects.all()

        else:
            # Default queryset
            queryset = Application.objects.none()

        return queryset

    def get_serializer_class(self):
        user = self.request.user
        if user.is_authenticated:
            # Return serializer for creating offers if method is POST
            if self.request.method == "POST":
                return CreateApplicationSerializer
            # Return serializer for displaying application if user is candidate
            elif user.type == UserType.CANDIDATE:
                return ApplicationSerializer
            # Return serializer for displaying application if user is company
            elif user.type == UserType.COMPANY or user.type == UserType.ADMIN:
                return CompanyApplicationSerializer
        else:
            return ApplicationSerializer  # Default serializer class

    # Set candidate as current user's candidate profile on save
    def perform_create(self, serializer):
        user = self.request.user
        try:
            Candidate.objects.get(user=user)
        except Candidate.DoesNotExist:
            # Throw error if user doesn't have company profile
            raise BadRequest(_("Użytkownik nie ma profilu kandydata."))
        else:
            candidate = user.candidate_profile
            serializer.save(candidate=candidate).clean()


# Display a single offer
class ApplicationDetail(generics.RetrieveUpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    name = "application"
    permission_classes = [
        DjangoModelPermissions,
        IsCandidateObjectOwnerOrCompanyReadOnly,
    ]

    def get_serializer_class(self):
        user = self.request.user
        # Return serializer for displaying application if user is candidate
        if user.is_authenticated:
            if user.type == UserType.CANDIDATE:
                return ApplicationSerializer
            # Return serializer for displaying application if user is company
            elif user.type == UserType.COMPANY:
                return CompanyApplicationSerializer
        else:
            return ApplicationSerializer  # Default serializer class


# Display list of attachments
class AttachmentList(generics.ListCreateAPIView):
    name = "attachments"
    permission_classes = [
        DjangoModelPermissions,
        IsCandidateViewOwnerOrCompanyReadOnly,
    ]

    def get_queryset(self):
        application = self.kwargs["application"]
        return Attachment.objects.filter(application=application)

    def get_serializer_class(self):
        # Return serializer for creating offers if method is POST
        if self.request.method == "POST":
            return CreateAttachmentSerializer
        else:
            return AttachmentSerializer  # Default serializer class

    # Set current application as appliaction
    def perform_create(self, serializer):
        application = Application.objects.get(id=self.kwargs["application"])
        serializer.save(application=application).clean()


# Display single requirement
class AttachmentDetail(generics.RetrieveAPIView):
    queryset = Attachment.objects.all()
    serializer_class = AttachmentSerializer
    name = "attachment"
    permission_classes = [
        DjangoModelPermissions,
        IsCandidateObjectOwnerOrCompanyReadOnly,
    ]
