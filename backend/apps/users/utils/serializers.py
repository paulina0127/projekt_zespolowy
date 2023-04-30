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


class CandidateUserSerializer(UserSerializer):
    profile = serializers.PrimaryKeyRelatedField(
        source="candidate_profile", read_only=True
    )

    class Meta(UserSerializer.Meta):
        model = User
        fields = ["id", "email", "type", "profile"]


class CompanyUserSerializer(UserSerializer):
    profile = serializers.PrimaryKeyRelatedField(
        source="company_profile", read_only=True
    )

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
