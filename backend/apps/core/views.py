from .imports.views_imports import *


class LocationDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    name = "location-detail"


class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    name = "category-list"
    filterset_class = CategoryFilter
    search_fields = ["name"]
    ordering_fields = ["id", "name"]


class CategoryDetail(generics.RetrieveAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    name = "category-detail"


class SkillList(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    name = "skill-list"
    filterset_fields = ["type"]
    search_fields = ["name"]
    ordering_fields = ["id", "name"]


class SkillDetail(generics.RetrieveAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    name = "skill-detail"


class ApiRoot(generics.GenericAPIView):
    name = "api"

    def get(self, request, *args, **kwargs):
        return Response(
            {
                "categories": reverse(CategoryList.name, request=request),
                "skills": reverse(SkillList.name, request=request),
                "offers": reverse(OfferList.name, request=request),
                "companies": reverse(CompanyList.name, request=request),
            }
        )
