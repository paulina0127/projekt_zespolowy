from .imports.views_imports import *


class OfferList(generics.ListAPIView):
    queryset = Offer.objects.filter(expiration_date__gt=timezone.now(), is_verified=True)
    serializer_class = OfferSerializer
    name = "offer-list"
    filterset_class = OfferFilter
    search_fields = ["position", "company__name"]
    ordering_fields = ["id"]


class OfferInCategoryList(generics.ListAPIView):
    serializer_class = OfferSerializer
    name = "offer-in-category-list"
    filterset_class = OfferFilter
    search_fields = ["position", "company__name"]
    ordering_fields = ["id"]

    def get_queryset(self):
        category = self.kwargs['cat']
        return Offer.objects.filter(expiration_date__gt=timezone.now(), is_verified=True, category__name__iexact=category)


class OfferDetail(generics.RetrieveAPIView):
    queryset = Offer.objects.filter(expiration_date__gt=timezone.now(), is_verified=True)
    serializer_class = OfferSerializer
    name = "offer-detail"


class CompanyOfferList(generics.ListCreateAPIView):
    serializer_class = OfferSerializer
    name = "company-offer-list"
    filterset_class = OfferFilter
    search_fields = ["position", "company__name"]
    ordering_fields = ["id"]
    permission_classes = [permissions.IsAuthenticated, IsCompany]

    def get_queryset(self):
        user_id = self.kwargs['pk']
        return Offer.objects.filter(company__user__id=user_id)

    def perform_create(self, serializer):
        company = self.request.user.company_profile
        serializer.save(company=company)


class CompanyOfferDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    name = "company-offer-detail"
    lookup_url_kwarg = "offer_pk"
    permission_classes = [permissions.IsAuthenticated, IsCompanyOwner]
