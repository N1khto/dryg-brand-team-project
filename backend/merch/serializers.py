from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from merch.models import CorporateOrderMessage


class CorporateOrderMessageSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(read_only=False)
    last_name = serializers.CharField(read_only=False)
    email = serializers.EmailField(read_only=False)
    phone_number = PhoneNumberField(read_only=False)
    message = serializers.CharField(read_only=False)

    class Meta:
        model = CorporateOrderMessage
        fields = ("first_name", "last_name", "email", "phone_number", "message")
