from rest_framework import serializers

from apps.core.models import Location
from apps.core.utils.serializers import CategorySerializer, LocationSerializer
from apps.profiles.utils.serializers import (CandidateSerializer,
                                             FileSerializer,
                                             MinCompanySerializer)

from ..models import Application, Attachment, Offer, Requirement


class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        exclude = ["offer"]


class AttachmentSerializer(serializers.ModelSerializer):
    file = FileSerializer(read_only=True)

    class Meta:
        model = Attachment
        fields = "__all__"


class CreateAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        exclude = ["application"]


# Serializer for creating and updating offer
class CreateOfferSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    requirements = RequirementSerializer(many=True, required=False)

    class Meta:
        model = Offer
        exclude = ["is_verified", "company"]

    def create(self, validated_data):
        # Add location while adding offer
        location_data = validated_data.pop("location")
        location = Location.objects.create(**location_data)

        # Add requirements while adding offer
        requirements_data = validated_data.pop("requirements", [])
        offer = Offer.objects.create(location=location, **validated_data)

        for requiremnt_data in requirements_data:
            Requirement.objects.create(offer=offer, **requiremnt_data)
        return offer

    def update(self, offer, validated_data):
        # Update location while updating offer
        if "location" in validated_data:
            location_data = validated_data.pop("location")
            location = offer.location
            for attr, value in location_data.items():
                setattr(location, attr, value)
            location.save()

        for attr, value in validated_data.items():
            setattr(offer, attr, value)
        offer.save()

        return offer


# Default serializer for displaying offer
class OfferSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    requirements = RequirementSerializer(many=True)
    category = CategorySerializer()
    company = MinCompanySerializer()

    class Meta:
        model = Offer
        exclude = ["is_verified"]


# Serializer for displaying offer in application
class MinOfferSerializer(serializers.ModelSerializer):
    company = MinCompanySerializer(read_only=True)

    class Meta:
        model = Offer
        fields = ["id", "position", "company"]


# Serializer for creating a new application
class CreateApplicationSerializer(serializers.ModelSerializer):
    attachments = CreateAttachmentSerializer(many=True, required=False)

    class Meta:
        model = Application
        exclude = ["mark", "notes", "candidate", "status"]

    def create(self, validated_data):
        # Add attachments while adding application
        attachments_data = validated_data.pop("attachments", [])
        application = Application.objects.create(**validated_data)
        for attachment_data in attachments_data:
            Attachment.objects.create(application=application, **attachment_data)
        return application


# Serializer for displaying application to candidate
class ApplicationSerializer(serializers.ModelSerializer):
    attachments = AttachmentSerializer(many=True, read_only=True)
    offer = MinOfferSerializer(read_only=True)

    class Meta:
        model = Application
        exclude = ["mark", "notes", "candidate"]


# Serializer for displaying application to company
class CompanyApplicationSerializer(serializers.ModelSerializer):
    attachments = AttachmentSerializer(many=True, read_only=True)
    candidate = CandidateSerializer(read_only=True)
    offer = MinOfferSerializer(read_only=True)

    class Meta:
        model = Application
        fields = "__all__"
        read_only_fields = ["type"]
