from django.contrib.auth import get_user_model
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers

from orders.serializers import OrderSerializer
from products.serializers import ProductSerializer
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "email",
            "password",
            "is_staff",
            "first_name",
            "last_name",
        )
        read_only_fields = (
            "id",
            "is_staff",
            "email",
        )
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
    region = serializers.CharField(read_only=False, allow_null=True, allow_blank=True)
    city = serializers.CharField(read_only=False, allow_null=True, allow_blank=True)
    nova_post_department = serializers.IntegerField(read_only=False, allow_null=True)
    phone_number = PhoneNumberField(
        region="UA", read_only=False, allow_null=True, allow_blank=True
    )

    class Meta:
        model = get_user_model()
        fields = (
            "region",
            "city",
            "nova_post_department",
            "phone_number",
        )


class UserOrderHistorySerializer(UserSerializer):
    user_orders = OrderSerializer(many=True, source="orders")

    class Meta:
        model = get_user_model()
        fields = ("user_orders",)


class UserWishlistSerializer(UserSerializer):
    wishlist = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = get_user_model()
        fields = ("wishlist",)
