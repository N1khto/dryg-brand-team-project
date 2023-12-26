from django.db.models import Count, Max
from rest_framework import filters
from rest_framework.viewsets import ModelViewSet

from products.models import Product, Item
from products.serializers import ProductSerializer, ProductListSerializer, ItemSerializer, ItemListSerializer, \
    ItemDetailSerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["name", "category__name", "fabric", "description", "items__size__value", "items__color__name",]

    def get_serializer_class(self):
        if self.action == "list":
            return ProductListSerializer
        if self.action == "retrieve":
            return ProductSerializer
        return ProductSerializer

    def get_queryset(self):
        return Product.objects.annotate(max_price=Max("items__price")).prefetch_related("items")


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_serializer_class(self):
        if self.action == "list":
            return ItemListSerializer
        if self.action == "retrieve":
            return ItemDetailSerializer
        return ItemSerializer
