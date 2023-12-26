from django.db.models import  Max
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from rest_framework.filters import SearchFilter
from rest_framework.viewsets import ModelViewSet

from products.models import Product, Item
from products.serializers import ProductSerializer, ProductListSerializer, ItemSerializer, ItemListSerializer, \
    ItemDetailSerializer


class ProductFilter(filters.FilterSet):
    size = filters.AllValuesMultipleFilter(field_name="items__size__value")
    color = filters.AllValuesMultipleFilter(field_name="items__color__name")

    class Meta:
        model = Product
        fields = ["size", "color"]


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ["name", "category__name", "fabric", "description", "items__size__value", "items__color__name"]
    filterset_class = ProductFilter

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
