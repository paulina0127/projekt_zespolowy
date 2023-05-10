from apps.profiles.models import Candidate, Company
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers

from .choices import UserType

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ["id", "email", "type", "password"]


class DefaultUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ["id", "email", "type"]


class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ["id", "first_name", "last_name", "image"]


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "name", "image"]


class CandidateUserSerializer(UserSerializer):
    profile = CandidateSerializer(read_only=True, source="candidate_profile")

    class Meta(UserSerializer.Meta):
        model = User
        fields = ["id", "email", "type", "profile"]


class CompanyUserSerializer(UserSerializer):
    profile = CompanySerializer(read_only=True, source="company_profile")

    class Meta(UserSerializer.Meta):
        model = User
        fields = ["id", "email", "type", "profile"]


class UserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        model = User
        fields = ["id", "email", "type", "password"]

    def to_representation(self, instance):
        user = self.context["request"].user
        # Return user serializer for candiate
        if user.type == UserType.CANDIDATE:
            serializer = CandidateUserSerializer(instance, context=self.context)
        # Return user serializer for company
        elif user.type == UserType.COMPANY:
            serializer = CompanyUserSerializer(instance, context=self.context)
        # Return default user serializer
        else:
            serializer = DefaultUserSerializer(instance, context=self.context)
        return serializer.data
