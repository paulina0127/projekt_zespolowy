from .imports.views_imports import *


class CompanyList(generics.ListAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    name = "company-list"
    filterset_class = CompanyFilter
    search_fields = ["name"]
    ordering_fields = ["id", "name"]


class CompanyDetail(generics.RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    name = "company-detail"


class CompanyProfile(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CompanyProfileSerializer
    name = "company-profile"
    permission_classes = [permissions.IsAuthenticated, IsCompany]

    def get_object(self):
        user_id = self.kwargs['pk']
        return Company.objects.get(user__id=user_id)


class CandidateProfile(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CandidateProfileSerializer
    name = "candidate-profile"
    permission_classes = [permissions.IsAuthenticated, IsCandidate]

    def get_object(self):
        user_id = self.kwargs['pk']
        return Candidate.objects.get(user__id=user_id)


class CreateCompanyProfile(generics.CreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanyProfileSerializer
    name = "company-profile"
    permission_classes = [permissions.IsAuthenticated, permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)


class CreateCandidateProfile(generics.CreateAPIView):
    queryset = Candidate.objects.all()
    serializer_class = CandidateProfileSerializer
    name = "candidate-profile"
    permission_classes = [permissions.IsAuthenticated, permissions.DjangoModelPermissions]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)
