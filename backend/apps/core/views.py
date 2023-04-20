from .imports.views_imports import *


class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = MainCategorySerializer
    name = "categories"
    filterset_class = CategoryFilter
    search_fields = ["name"]
    ordering_fields = ["id", "name"]


class CategoryDetail(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = MainCategorySerializer
    name = "category"


class SkillList(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    name = "skills"
    filterset_fields = ["type"]
    search_fields = ["name"]
    ordering_fields = ["id", "name"]


class SkillDetail(generics.RetrieveAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    name = "skill"


class ApiRoot(generics.GenericAPIView):
    name = "api"

    def get(self, request, *args, **kwargs):
        return Response(
            {
                "categories": reverse(CategoryList.name, request=request),
                "skills": reverse(SkillList.name, request=request),
                "companies": reverse(CompanyList.name, request=request),
                "candidates": reverse(CandidateList.name, request=request),
                "offers": reverse(OfferList.name, request=request),
                "applications": reverse(ApplicationList.name, request=request),
            }
        )
