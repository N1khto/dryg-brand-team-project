from rest_framework.viewsets import ModelViewSet

from orders.models import Order
from orders.serializers import OrderSerializer, OrderItemSerializer


class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_serializer_context(self) -> dict:
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context


class OrderItemViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderItemSerializer
