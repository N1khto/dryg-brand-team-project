from django.db import transaction
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from orders.models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    item_price = serializers.DecimalField(read_only=True, max_digits=8, decimal_places=2)

    def validate(self, attrs):
        data = super(OrderItemSerializer, self).validate(attrs=attrs)
        OrderItem.validate_item(attrs["quantity"], attrs["item"], ValidationError)
        return data

    class Meta:
        model = OrderItem
        fields = ("id", "item", "quantity", "item_price")


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=False, allow_empty=False)
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    total_price = serializers.DecimalField(read_only=True, max_digits=8, decimal_places=2)
    status = serializers.CharField(read_only=True, default="awaiting payment")

    class Meta:
        model = Order
        fields = ("id", "user", "order_date", "total_price", "status", "total_price", "order_items")

    def create(self, validated_data):
        with transaction.atomic():
            user = self.context["request"].user
            order_items = validated_data.pop("order_items")
            order = Order.objects.create(user=user, **validated_data)
            for order_item in order_items:
                OrderItem.objects.create(order=order, **order_item)
            return order
