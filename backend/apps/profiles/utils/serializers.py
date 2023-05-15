from rest_framework import serializers

from apps.core.models import Location
from apps.core.utils.serializers import LocationSerializer

from ..models import (Candidate, Company, Course, CSkill, Education,
                      Experience, File, Link)


# Serializer for user's company profile
class CreateCompanySerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = Company
        exclude = ["user", "auto_verify"]

    def create(self, validated_data):
        # Add location while adding company profile
        location_data = validated_data.pop("location")
        location = Location.objects.create(**location_data)
        company = Company.objects.create(location=location, **validated_data)
        return company

    def update(self, company, validated_data):
        # Update location while updating company profile
        if "location" in validated_data:
            location_data = validated_data.pop("location")
            location = company.location
            for attr, value in location_data.items():
                setattr(location, attr, value)
            location.save()

        for attr, value in validated_data.items():
            setattr(company, attr, value)
        company.save()

        return company


# Default serializer for company
class CompanySerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = Company
        exclude = ["nip", "user", "auto_verify"]


# Serializer for company profile in offer
class MinCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "name", "image"]


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        exclude = ["candidate"]


class ExperienceSerializer(serializers.ModelSerializer):
    location = LocationSerializer(required=False)

    class Meta:
        model = Experience
        exclude = ["candidate"]

    def create(self, validated_data):
        # Add location while adding company profile
        if "location" in validated_data:
            location_data = validated_data.pop("location")
            location = Location.objects.create(**location_data)
            experience = Experience.objects.create(location=location, **validated_data)
        else:
            experience = Experience.objects.create(**validated_data)
        return experience

    def update(self, experience, validated_data):
        # Update location while updating company profile
        if "location" in validated_data:
            location_data = validated_data.pop("location")
            location = experience.location
            for attr, value in location_data.items():
                setattr(location, attr, value)
            location.save()

        for attr, value in validated_data.items():
            setattr(experience, attr, value)
        experience.save()

        return experience


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        exclude = ["candidate"]


class CSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSkill
        exclude = ["candidate"]


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        exclude = ["candidate"]


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        exclude = ["candidate"]


# Serializer for user's candidate profile
class CreateCandidateSerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = Candidate
        exclude = ["user"]

    def create(self, validated_data):
        # Add location while adding candidate profile
        location_data = validated_data.pop("location")
        location = Location.objects.create(**location_data)
        candidate = Candidate.objects.create(location=location, **validated_data)
        return candidate

    def update(self, candidate, validated_data):
        # Update location while updating candidate profile
        if "location" in validated_data:
            location_data = validated_data.pop("location")
            location = candidate.location
            for attr, value in location_data.items():
                setattr(location, attr, value)
            location.save()

        for attr, value in validated_data.items():
            setattr(candidate, attr, value)
        candidate.save()

        return candidate


# Serializer for displaying candidate on application
class CandidateSerializer(serializers.ModelSerializer):
    location = LocationSerializer(many=False, read_only=True)

    class Meta:
        model = Candidate
        exclude = ["pesel", "user"]
