from django.contrib.auth import get_user_model
from django.db.models import Max
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from products.models import Product, Item
from products.serializers import (
    ProductSerializer,
    ProductListSerializer,
    ItemSerializer,
    ItemListSerializer,
    ItemDetailSerializer,
)


class ProductFilter(filters.FilterSet):
    size = filters.AllValuesMultipleFilter(field_name="items__size__value")
    color = filters.AllValuesMultipleFilter(field_name="items__color__name")
    category = filters.AllValuesFilter(field_name="category__name")

    class Meta:
        model = Product
        fields = ["size", "color", "category"]


class ProductPagination(PageNumberPagination):
    page_size = 12


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [SearchFilter, DjangoFilterBackend, OrderingFilter]
    search_fields = [
        "name",
        "category__name",
        "fabric",
        "description",
        "items__size__value",
        "items__color__name",
    ]
    filterset_class = ProductFilter
    ordering_fields = ["items__price", "date_added"]
    pagination_class = ProductPagination
    permission_classes = (AllowAny,)

    def get_serializer_class(self):
        if self.action == "list":
            return ProductListSerializer
        if self.action == "retrieve":
            return ProductSerializer
        return ProductSerializer

    def get_queryset(self):
        return Product.objects.annotate(max_price=Max("items__price")).prefetch_related(
            "items"
        )

    def get_serializer_context(self) -> dict:
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    @action(detail=True, methods=["get"])
    def wishlist(self, request, pk=None):
        user = get_object_or_404(get_user_model(), id=request.user.pk)
        if int(pk) in user.wishlist.values_list(flat=True):
            user.wishlist.remove(pk)
        else:
            user.wishlist.add(pk)
        user.save()

        return Response(status=status.HTTP_200_OK)


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = (AllowAny,)

    def get_serializer_class(self):
        if self.action == "list":
            return ItemListSerializer
        if self.action == "retrieve":
            return ItemDetailSerializer
        return ItemSerializer
