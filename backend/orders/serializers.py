from rest_framework import serializers

from orders.models import Order, OrderItem


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ("id", "user", "order_date", "total_price", "status")


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ("id", "item", "quantity", "price", "order")
