from django.utils.translation import gettext_lazy as _

from .imports.views_imports import *


# Display list of all companies
class CompanyList(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    name = "companies"
    filterset_class = CompanyFilter
    search_fields = ["name"]
    ordering_fields = ["id", "name"]
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
    parser_classes = [MultiPartParser, JSONParser]

    def get_serializer_class(self):
        # Return serializer for displaying companies if method is GET
        if self.request.method == "GET":
            return CompanySerializer
        # Return serializer for creating companies if method is POST
        elif self.request.method == "POST":
            return CreateCompanySerializer
        else:
            return CompanySerializer  # Default serializer class

    # Set company as current user's company profile on save
    def perform_create(self, serializer):
        user = self.request.user
        try:
            Company.objects.get(user=user)
        except Company.DoesNotExist:
            serializer.save(user=user).clean()
        else:
            # Throw error if user already has a profile
            raise BadRequest(_("Profil pracodawcy już istnieje."))

    def post(self, request, *args, **kwargs):
        location_data = {
            "street_address": request.data.get("location[street_address]"),
            "postal_code": request.data.get("location[postal_code]"),
            "city": request.data.get("location[city]"),
        }

        data = {}
        for key, value in request.data.items():
            if not (key.startswith("location[") and key.endswith("]")):
                data[key] = value

        data["location"] = location_data

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


# Display single company
class CompanyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    name = "company"
    permission_classes = [IsCompanyObjectOwnerOrAnonReadOnly]
    parser_classes = [MultiPartParser, JSONParser]

    def get_serializer_class(self):
        user = self.request.user
        # Return serializer for displaying company if method is GET and current user is company owner
        if self.get_object().user == user:
            return CreateCompanySerializer
        # Return serializer for displaying company if method is GET
        else:
            return CompanySerializer  # Default serializer class

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()

        instance.location.street_address = request.data.get("location[street_address]")
        instance.location.postal_code = request.data.get("location[postal_code]")
        instance.location.city = request.data.get("location[city]")

        data = {}
        for key, value in request.data.items():
            if not (key.startswith("location[") and key.endswith("]")):
                data[key] = value

        print(data)
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


# Create candidate profile
class CandidateList(generics.ListCreateAPIView):
    queryset = Candidate.objects.all()
    serializer_class = CreateCandidateSerializer
    name = "candidates"
    permission_classes = [
        DjangoModelPermissions,
    ]
    parser_classes = [MultiPartParser, JSONParser]

    def get_queryset(self):
        user = self.request.user
        try:
            Candidate.objects.get(user=user)
        except Candidate.DoesNotExist:
            queryset = Candidate.objects.none()
        else:
            queryset = Candidate.objects.filter(user=user)
        return queryset

    # Set candidate as current user's candidate profile on save
    def perform_create(self, serializer):
        user = self.request.user
        try:
            Candidate.objects.get(user=user)
        except Candidate.DoesNotExist:
            serializer.save(user=user).clean()
        else:
            # Throw error if user already has a profile
            raise BadRequest(_("Profil kandydata już istnieje."))

    def post(self, request, *args, **kwargs):
        location_data = {
            "street_address": request.data.get("location[street_address]"),
            "postal_code": request.data.get("location[postal_code]"),
            "city": request.data.get("location[city]"),
        }

        data = {}
        for key, value in request.data.items():
            if not (key.startswith("location[") and key.endswith("]")):
                data[key] = value

        data["location"] = location_data

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


# Display single candidate
class CandidateDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Candidate.objects.all()
    name = "candidate"
    permission_classes = [IsCandidateObjectOwnerOrCompanyReadOnly]
    parser_classes = [MultiPartParser, JSONParser]

    def get_serializer_class(self):
        user = self.request.user

        # Return serializer for displaying candidate if current user is candidate owner
        if self.get_object().user == user:
            return CreateCandidateSerializer
        else:
            return CandidateSerializer

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()

        instance.location.street_address = request.data.get("location[street_address]")
        instance.location.postal_code = request.data.get("location[postal_code]")
        instance.location.city = request.data.get("location[city]")

        data = {}
        for key, value in request.data.items():
            if not (key.startswith("location[") and key.endswith("]")):
                data[key] = value

        serializer_class = self.get_serializer_class()
        serializer = serializer_class(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


# Display file list
class FileList(generics.ListCreateAPIView):
    serializer_class = FileSerializer
    name = "files"
    filterset_fields = ["type"]
    search_fields = ["name"]
    ordering_fields = ["id", "added_at"]
    permission_classes = [
        DjangoModelPermissions,
        IsCandidateViewOwnerOrCompanyReadOnly,
    ]

    def get_queryset(self):
        candidate = self.kwargs["candidate"]
        return File.objects.filter(candidate=candidate)

    # Set candidate as user's candidate profile on save
    def perform_create(self, serializer):
        user = self.request.user
        try:
            Candidate.objects.get(user=user)
        except Candidate.DoesNotExist:
            # Throw error if user doesn't have candidate profile
            raise BadRequest(
                _("Do wykonania tej akcji potrzebny jest profil kandydata.")
            )
        else:
            candidate = user.candidate_profile
            serializer.save(candidate=candidate).clean()


# Display single file
class FileDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FileSerializer
    name = "file"
    permission_classes = [
        IsCandidateObjectOwnerOrCompanyReadOnly,
    ]

    def get_queryset(self):
        candidate = self.kwargs["candidate"]
        return File.objects.filter(candidate=candidate)


# Display experience list
class ExperienceList(generics.ListCreateAPIView):
    serializer_class = ExperienceSerializer
    name = "experiences"
    ordering_fields = ["end_date"]
    permission_classes = [
        DjangoModelPermissions,
        IsCandidateViewOwnerOrCompanyReadOnly,
    ]

    def get_queryset(self):
        candidate = self.kwargs["candidate"]
        return Experience.objects.filter(candidate=candidate)

    # Set candidate as user's candidate profile on save
    def perform_create(self, serializer):
        user = self.request.user
        try:
            Candidate.objects.get(user=user)
        except Candidate.DoesNotExist:
            # Throw error if user doesn't have candidate profile
            raise BadRequest(
                _("Do wykonania tej akcji potrzebny jest profil kandydata.")
            )
        else:
            candidate = user.candidate_profile
            serializer.save(candidate=candidate).clean()


# Display single experience
class ExperienceDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExperienceSerializer
    name = "experience"
    permission_classes = [
        DjangoModelPermissions,
        IsCandidateObjectOwnerOrCompanyReadOnly,
    ]

    def get_queryset(self):
        candidate = self.kwargs["candidate"]
        return Experience.objects.filter(candidate=candidate)


# Display education list
class EducationList(generics.ListCreateAPIView):
    serializer_class = EducationSerializer
    name = "educations"
    ordering_fields = ["end_date"]
    permission_classes = [
        DjangoModelPermissions,
        IsCandidateViewOwnerOrCompanyReadOnly,
    ]

    def get_queryset(self):
        candidate = self.kwargs["candidate"]
        return Education.objects.filter(candidate=candidate)

    # Set candidate as user's candidate profile on save
    def perform_create(self, serializer):
        user = self.request.user
        try:
            Candidate.objects.get(user=user)
        except Candidate.DoesNotExist:
            # Throw error if user doesn't have candidate profile
            raise BadRequest(
                _("Do wykonania tej akcji potrzebny jest profil kandydata.")
            )
        else:
            candidate = user.candidate_profile
            serializer.save(candidate=candidate).clean()


# Display single education
class EducationDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EducationSerializer
    name = "education"
    permission_classes = [
        DjangoModelPermissions,
        IsCandidateObjectOwnerOrCompanyReadOnly,
    ]

    def get_queryset(self):
        candidate = self.kwargs["candidate"]
        return Education.objects.filter(candidate=candidate)


# Display skill list
class CSkillList(generics.ListCreateAPIView):
    serializer_class = CSkillSerializer
    name = "skills"
    permission_classes = [
        DjangoModelPermissions,
        IsCandidateViewOwnerOrCompanyReadOnly,
    ]

    def get_queryset(self):
        candidate = self.kwargs["candidate"]
        return CSkill.objects.filter(candidate=candidate)

    # Set candidate as user's candidate profile on save
    def perform_create(self, serializer):
        user = self.request.user
        try:
            Candidate.objects.get(user=user)
        except Candidate.DoesNotExist:
            # Throw error if user doesn't have candidate profile
            raise BadRequest(
                _("Do wykonania tej akcji potrzebny jest profil kandydata.")
            )
        else:
            candidate = user.candidate_profile
            serializer.save(candidate=candidate).clean()


# Display single skill
class CSkillDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CSkillSerializer
    name = "skill"
    permission_classes = [
        DjangoModelPermissions,
        IsCandidateObjectOwnerOrCompanyReadOnly,
    ]

    def get_queryset(self):
        candidate = self.kwargs["candidate"]
        return CSkill.objects.filter(candidate=candidate)


# Display course list
class CourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    name = "courses"
    ordering_fields = ["end_date"]
    permission_classes = [
        DjangoModelPermissions,
        IsCandidateViewOwnerOrCompanyReadOnly,
    ]

    def get_queryset(self):
        candidate = self.kwargs["candidate"]
        return Course.objects.filter(candidate=candidate)

    # Set candidate as user's candidate profile on save
    def perform_create(self, serializer):
        user = self.request.user
        try:
            Candidate.objects.get(user=user)
        except Candidate.DoesNotExist:
            # Throw error if user doesn't have candidate profile
            raise BadRequest(
                _("Do wykonania tej akcji potrzebny jest profil kandydata.")
            )
        else:
            candidate = user.candidate_profile
            serializer.save(candidate=candidate).clean()


# Display single course
class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CourseSerializer
    name = "course"
    permission_classes = [
        DjangoModelPermissions,
        IsCandidateObjectOwnerOrCompanyReadOnly,
    ]

    def get_queryset(self):
        candidate = self.kwargs["candidate"]
        return Course.objects.filter(candidate=candidate)


# Display link list
class LinkList(generics.ListCreateAPIView):
    serializer_class = LinkSerializer
    name = "links"
    permission_classes = [
        DjangoModelPermissions,
        IsCandidateViewOwnerOrCompanyReadOnly,
    ]

    def get_queryset(self):
        candidate = self.kwargs["candidate"]
        return Link.objects.filter(candidate=candidate)

    # Set candidate as user's candidate profile on save
    def perform_create(self, serializer):
        user = self.request.user
        try:
            Candidate.objects.get(user=user)
        except Candidate.DoesNotExist:
            # Throw error if user doesn't have candidate profile
            raise BadRequest(
                _("Do wykonania tej akcji potrzebny jest profil kandydata.")
            )
        else:
            candidate = user.candidate_profile
            serializer.save(candidate=candidate).clean()


# Display single link
class LinkDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LinkSerializer
    name = "link"
    permission_classes = [
        DjangoModelPermissions,
        IsCandidateObjectOwnerOrCompanyReadOnly,
    ]

    def get_queryset(self):
        candidate = self.kwargs["candidate"]
        return Link.objects.filter(candidate=candidate)
