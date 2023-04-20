from django.urls import path

from .views import (
    OfferDetail,
    OfferList,
    RequirementDetail,
    RequirementList,
    ApplicationList,
    ApplicationDetail,
    AttachmentList,
    AttachmentDetail,
)

urlpatterns = [
    # Offers
    path("offers", OfferList.as_view(), name=OfferList.name),
    path("offers/<int:pk>", OfferDetail.as_view(), name=OfferDetail.name),
    # Requirements
    path(
        "offers/<int:offer>/requirements",
        RequirementList.as_view(),
        name=RequirementList.name,
    ),
    path(
        "offers/<int:offer>/requirements/<int:pk>",
        RequirementDetail.as_view(),
        name=RequirementDetail.name,
    ),
    # Applications
    path(
        "applications",
        ApplicationList.as_view(),
        name=ApplicationList.name,
    ),
    path(
        "applications/<int:pk>",
        ApplicationDetail.as_view(),
        name=ApplicationDetail.name,
    ),
    # Attachments
    path(
        "applications/<int:application>/attachments",
        AttachmentList.as_view(),
        name=AttachmentList.name,
    ),
    path(
        "applications/<int:application>/attachments/<int:pk>",
        AttachmentDetail.as_view(),
        name=AttachmentDetail.name,
    ),
]
