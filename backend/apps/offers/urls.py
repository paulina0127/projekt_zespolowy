from django.urls import path

from .views import (OfferList, OfferInCategoryList, OfferDetail, CompanyOfferList, CompanyOfferDetail)

urlpatterns = [
    # Offers
    path('offers', OfferList.as_view(), name=OfferList.name),
    path('offers/category/<str:cat>', OfferInCategoryList.as_view(), name=OfferInCategoryList.name),
    path('offers/<int:pk>', OfferDetail.as_view(), name=OfferDetail.name),
    # Company offers
    path('auth/users/<int:pk>/offers', CompanyOfferList.as_view(), name=CompanyOfferList.name),
    path('auth/users/<int:pk>/offers/<int:offer_pk>', CompanyOfferDetail.as_view(), name=CompanyOfferDetail.name),
    # # Candidate applications
    # path('auth/users/<int:pk>/applications', CandidateApplicationList.as_view(), name=CandidateApplicationList.name),
    # path('auth/users/<int:pk>/applications/<int:offer_pk>', CandidateApplicationDetail.as_view(), name=CandidateApplicationDetail.name),
    # # Company applications
    # path('auth/users/<int:pk>/offer_applications ', CompanyApplicationList.as_view(), name=CompanyApplicationList.name),
    # path('auth/users/<int:pk>/offer_applications/<int:offer_pk>', CompanyApplicationDetail.as_view(), name=CompanyApplicationDetail.name),
    # # Company applications
    # path('auth/users/<int:pk>/offers/<int:offer_pk>/applications ', OfferApplicationList.as_view(), name=OfferApplicationList.name),
    # path('auth/users/<int:pk>/offer_applications/<int:offer_pk>',
    #      CompanyApplicationDetail.as_view(), name=CompanyApplicationDetail.name),
]
