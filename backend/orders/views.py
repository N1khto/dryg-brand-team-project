from rest_framework import mixins, generics, viewsets
from rest_framework.permissions import AllowAny

from orders.models import Order, OrderItem
from orders.serializers import (
    OrderSerializer,
    OrderItemSerializer,
    OrderAddInfoSerializer,
)
from payments.views import create_order_payment


class OrderViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Order.objects.prefetch_related("order_items__item", "payment")
    serializer_class = OrderSerializer
    permission_classes = (AllowAny,)

    def get_serializer_context(self) -> dict:
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def perform_create(self, serializer):
        instance = serializer.save()
        create_order_payment(instance, serializer.context.get("request"))


class OrderAddInfoView(generics.UpdateAPIView):
    queryset = Order.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = OrderAddInfoSerializer
    lookup_field = "uuid"


class OrderItemViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = OrderItem.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = OrderItemSerializer
