from django.contrib.auth.models import AnonymousUser
from django.db import transaction
from phonenumber_field.serializerfields import PhoneNumberField
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from orders.models import Order, OrderItem
from products.serializers import ItemOrderHistorySerializer


class OrderItemSerializer(serializers.ModelSerializer):
    item_price = serializers.DecimalField(
        read_only=True, max_digits=8, decimal_places=2
    )

    def validate(self, attrs):
        data = super(OrderItemSerializer, self).validate(attrs=attrs)
        OrderItem.validate_item(attrs["quantity"], attrs["item"], ValidationError)
        return data

    class Meta:
        model = OrderItem
        fields = ("id", "item", "quantity", "item_price")


class OrderItemHistorySerializer(OrderItemSerializer):
    item = ItemOrderHistorySerializer(many=False, read_only=True)

    class Meta:
        model = OrderItem
        fields = ("id", "item", "quantity", "item_price")


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=False, allow_empty=False)
    user = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault(), required=False
    )
    total_price = serializers.DecimalField(
        read_only=True, max_digits=8, decimal_places=2
    )
    status = serializers.CharField(read_only=True, default="awaiting payment")
    payment_link = serializers.SlugRelatedField(
        read_only=True, source="payment", slug_field="session_url"
    )

    class Meta:
        model = Order
        fields = (
            "id",
            "user",
            "order_date",
            "total_price",
            "status",
            "total_price",
            "order_items",
            "payment_link",
            "customer_first_name",
            "customer_last_name",
            "customer_email",
            "customer_phone",
            "delivery_region",
            "delivery_city",
            "delivery_nova_post_department",
        )
        read_only_fields = (
            "id",
            "user",
            "order_date",
            "total_price",
            "status",
            "total_price",
            "payment_link",
            "customer_first_name",
            "customer_last_name",
            "customer_email",
            "customer_phone",
            "delivery_region",
            "delivery_city",
            "delivery_nova_post_department",
        )

    def create(self, validated_data):
        with transaction.atomic():
            user = self.context["request"].user
            if isinstance(user, AnonymousUser):
                user = None
            order_items = validated_data.pop("order_items")
            order = Order.objects.create(user=user, **validated_data)
            for order_item in order_items:
                order_item_object = OrderItem.objects.create(order=order, **order_item)
                item = order_item_object.item
                item.stock -= order_item_object.quantity
                item.save()
            return order


class OrderAddInfoSerializer(serializers.ModelSerializer):
    customer_first_name = serializers.CharField(read_only=False)
    customer_last_name = serializers.CharField(read_only=False)
    customer_email = serializers.EmailField(read_only=False, required=False)
    customer_phone = PhoneNumberField(read_only=False)
    delivery_region = serializers.CharField(read_only=False)
    delivery_city = serializers.CharField(read_only=False)
    delivery_nova_post_department = serializers.CharField(read_only=False)

    class Meta:
        model = Order
        fields = (
            "id",
            "customer_first_name",
            "customer_last_name",
            "customer_email",
            "customer_phone",
            "delivery_region",
            "delivery_city",
            "delivery_nova_post_department",
        )


class OrderHistorySerializer(OrderSerializer):
    order_items = OrderItemHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "user",
            "order_date",
            "total_price",
            "status",
            "total_price",
            "order_items",
            "payment_link",
            "customer_first_name",
            "customer_last_name",
            "customer_email",
            "customer_phone",
            "delivery_region",
            "delivery_city",
            "delivery_nova_post_department",
        )
