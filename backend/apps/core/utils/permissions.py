from rest_framework import permissions
# from apps.users.models import User


class IsCompanyOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.company == request.user.company_profile


class IsCompany(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if user.type != "Pracodawca":
            return False
        return True


class IsCandidate(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if user.type != "Kandydat":
            return False
        return True
