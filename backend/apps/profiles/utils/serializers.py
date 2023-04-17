from rest_framework import serializers

from ..models import (Candidate, Company, Course, CSkill, Education, Experience,
                      File, Link)
from apps.core.utils.serializers import LocationSerializer
from apps.core.models import Location


class CompanyProfileSerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = Company
        exclude = ['user', 'auto_verify']

    def create(self, validated_data):
        location_data = validated_data.pop("location")
        location = Location.objects.create(**location_data)
        company = Company.objects.create(location=location, **validated_data)
        return company


class CompanySerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = Company
        exclude = ["nip", 'user', 'auto_verify']


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = "__all__"


class ExperienceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Experience
        fields = "__all__"


class EducationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Education
        fields = "__all__"


class CSkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = CSkill
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = "__all__"


class LinkSerializer(serializers.ModelSerializer):

    class Meta:
        model = Link
        fields = "__all__"


class CandidateProfileSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    education = EducationSerializer(many=True, read_only=True)
    experience = ExperienceSerializer(many=True, read_only=True)
    skills = CSkillSerializer(many=True, read_only=True)
    courses = CourseSerializer(many=True, read_only=True)
    links = LinkSerializer(many=True, read_only=True)

    class Meta:
        model = Candidate
        exclude = ['user']

    def create(self, validated_data):
        location_data = validated_data.pop("location")
        location = Location.objects.create(**location_data)
        candidate = Candidate.objects.create(location=location, **validated_data)
        return candidate


class CandidateSerializer(serializers.ModelSerializer):
    location = LocationSerializer(many=False, read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    experience = ExperienceSerializer(many=True, read_only=True)
    skills = CSkillSerializer(many=True, read_only=True)
    courses = CourseSerializer(many=True, read_only=True)
    links = LinkSerializer(many=True, read_only=True)

    class Meta:
        model = Candidate
        exclude = ["pesel", 'user']
