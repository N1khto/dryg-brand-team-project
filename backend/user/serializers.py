from django.contrib.auth import get_user_model
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from products.serializers import ProductSerializer
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    wishlist = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "email",
            "password",
            "is_staff",
            "wishlist",
            "region",
            "city",
            "nova_post_department",
            "phone_number",
        )
        read_only_fields = ("is_staff",)
        extra_kwargs = {"password": {"write_only": True, "min_length": 5}}

    def create(self, validated_data) -> User:
        """Create a new user with encrypted password and return it"""
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data) -> User:
        """Update a user, set the password correctly and return it"""
        password = validated_data.pop("password", None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()

        return user


class UserAddAddressSerializer(UserSerializer):
    region = serializers.CharField(read_only=False)
    city = serializers.CharField(read_only=False)
    nova_post_department = serializers.IntegerField(read_only=False)
    phone_number = PhoneNumberField(region="UA", read_only=False)

    class Meta:
        model = get_user_model()
        fields = (
            "region",
            "city",
            "nova_post_department",
            "phone_number",
        )
