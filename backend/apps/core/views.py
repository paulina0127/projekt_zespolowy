from .imports.views_imports import *


def serve_file(request, path):
    # Construct the absolute path to the file
    abs_path = os.path.join(settings.MEDIA_ROOT, path)

    # Check if the file exists
    if not os.path.exists(abs_path):
        raise Http404("File not found")

    # Get the file extension
    file_extension = os.path.splitext(abs_path)[1].lower()

    # Set the appropriate content type based on the file extension
    if file_extension == ".pdf":
        content_type = "application/pdf"
    elif file_extension == ".doc" or file_extension == ".docx":
        content_type = "application/msword"
    elif file_extension in [".jpg", ".jpeg"]:
        content_type = "image/jpeg"
    elif file_extension == ".png":
        content_type = "image/png"
    else:
        content_type = "application/octet-stream"

    # Open the file as binary data
    with open(abs_path, "rb") as f:
        file_data = f.read()

    # Return the file data as a response
    response = HttpResponse(file_data, content_type=content_type)
    response["Content-Disposition"] = "inline; filename=" + os.path.basename(abs_path)
    return response


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
