from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):

    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ("id", "email", "type", "password")


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "email", "type"]