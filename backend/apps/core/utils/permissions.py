from rest_framework import permissions

from apps.offers.models import Application
from apps.offers.utils.choices import ApplicationType
from apps.profiles.models import Candidate, Company
from apps.users.utils.choices import UserType


class IsCompanyObjectOwnerOrAnonReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        if request.method in permissions.SAFE_METHODS:
            return True
        elif user.is_authenticated:
            try:
                Company.objects.get(user=user)
            except Company.DoesNotExist:
                return False
            else:
                # Company profile
                if hasattr(obj, "user"):
                    return obj.user == user
                # Offer
                elif hasattr(obj, "company"):
                    return obj.company == user.company_profile
                # Requirement
                elif hasattr(obj, "offer"):
                    return obj.offer.company == user.company_profile


class IsCandidateObjectOwnerOrCompanyReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        if user.is_authenticated:
            if user.type == UserType.CANDIDATE:
                try:
                    Candidate.objects.get(user=user)
                except Candidate.DoesNotExist:
                    return False
                else:
                    # Candidate profile
                    if hasattr(obj, "user"):
                        return obj.user == user
                    # Application, file, experience, education, cskill, course, link
                    elif hasattr(obj, "candidate"):
                        return obj.candidate == user.candidate_profile
                    # Attachment
                    elif hasattr(obj, "application"):
                        return obj.application.candidate == user.candidate_profile

            elif user.type == UserType.COMPANY:
                try:
                    Company.objects.get(user=user)
                except Company.DoesNotExist:
                    return False
                else:
                    # Candidate profile
                    if hasattr(obj, "user"):
                        return Application.objects.filter(
                            candidate=obj,
                            offer__company__user=user,
                        ).exists()
                    # Application
                    elif hasattr(obj, "offer"):
                        return Application.objects.filter(
                            candidate=obj.candidate,
                            offer__company__user=user,
                        ).exists()
                    # Experience, education, cskill, course, link
                    elif hasattr(obj, "candidate"):
                        return Application.objects.filter(
                            candidate=obj.candidate,
                            offer__company__user=user,
                            type=ApplicationType.PROFILE,
                        ).exists()
                    # Attachment
                    elif hasattr(obj, "application"):
                        return Application.objects.filter(
                            id=obj.application.id,
                            offer__company__user=user,
                        ).exists()
        else:
            return False


class IsCandidateViewOwnerOrCompanyReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        items = [
            "experiences",
            "educations",
            "skills",
            "courses",
            "links",
        ]
        if user.is_authenticated:
            if user.type == UserType.CANDIDATE:
                try:
                    Candidate.objects.get(user=user)
                except Candidate.DoesNotExist:
                    return False
                else:
                    if request.method == "POST":
                        return True
                    # File, experience, education, cskill, course, link
                    elif "candidate" in view.kwargs:
                        return view.kwargs["candidate"] == user.candidate_profile.id
                    # Attachment
                    elif "application" in view.kwargs:
                        application = view.kwargs["application"]
                        return Application.objects.filter(
                            id=application, candidate=user.candidate_profile
                        ).exists()
                    else:
                        return False

            elif user.type == UserType.COMPANY:
                try:
                    Company.objects.get(user=user)
                except Company.DoesNotExist:
                    return False
                else:
                    # File
                    if view.name == "files":
                        return False
                    # Experience, education, cskill, course, link
                    elif view.name in items:
                        candidate = view.kwargs["candidate"]
                        return Application.objects.filter(
                            candidate=candidate,
                            offer__company__user=user,
                            type=ApplicationType.PROFILE,
                        ).exists()
                    # Attachment
                    elif "application" in view.kwargs:
                        application = view.kwargs["application"]
                        return Application.objects.filter(
                            id=application, offer__company=user.company_profile
                        ).exists()
                    else:
                        return False

        else:
            return False
