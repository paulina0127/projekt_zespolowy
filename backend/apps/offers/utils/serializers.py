from rest_framework import serializers

from ..models import Offer, Requirement, Application, Attachment
from apps.core.utils.serializers import LocationSerializer
from apps.core.models import Location


class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirement
        fields = ["id", "type", "name", "skill"]


class OfferSerializer(serializers.ModelSerializer):
    location = LocationSerializer()
    requirements = RequirementSerializer(many=True)

    class Meta:
        model = Offer
        exclude = ['is_verified']

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


class AttachmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Attachment
        fields = "__all__"


class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = "__all__"
