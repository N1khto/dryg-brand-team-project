from rest_framework import mixins, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import GenericViewSet

from orders.models import Order, OrderItem
from orders.serializers import OrderSerializer, OrderItemSerializer, OrderAddInfoSerializer
from payments.views import create_order_payment


class OrderViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    GenericViewSet,
):
    queryset = Order.objects.all()
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


class OrderItemViewSet(mixins.CreateModelMixin, GenericViewSet):
    queryset = OrderItem.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = OrderItemSerializer
