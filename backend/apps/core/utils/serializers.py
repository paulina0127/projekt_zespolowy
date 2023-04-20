from rest_framework import serializers

from ..models import Category, Location, Skill


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class MainCategorySerializer(serializers.ModelSerializer):
    subcategories = CategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        exclude = ["parent"]
