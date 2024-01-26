from django.contrib.auth.models import AnonymousUser
from django.db.models import Max, F, Count
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from rest_framework import status, generics
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Item
from products.serializers import (
    ItemDetailSerializer,
    ItemListSerializer,
)


class ProductFilter(filters.FilterSet):
    size = filters.AllValuesMultipleFilter(field_name="size__value")
    color = filters.AllValuesMultipleFilter(
        field_name="color__name", lookup_expr="exact"
    )
    category = filters.CharFilter(field_name="category__name", lookup_expr="iexact")

    class Meta:
        model = Item
        fields = ["size", "color", "category"]


class ProductPagination(PageNumberPagination):
    page_size = 12


class ProductListView(generics.ListAPIView):
    queryset = Item.objects.select_related(
        "size", "color", "category"
    ).prefetch_related("images")
    serializer_class = ItemListSerializer
    filter_backends = [SearchFilter, DjangoFilterBackend, OrderingFilter]
    search_fields = [
        "name",
        "category__name",
        "fabric",
        "description",
        "size__value",
        "color__name",
    ]
    filterset_class = ProductFilter
    ordering_fields = ["price", "date_added"]
    # pagination_class = ProductPagination # temporary disabled
    permission_classes = (AllowAny,)

    def get_queryset(self):
        queryset = self.queryset
        return queryset.annotate(max_price=Max("price"))

    def get_serializer_context(self) -> dict:
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context


class ProductWishlistView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, pk=None):
        user = request.user
        if isinstance(user, AnonymousUser):
            return Response(
                "Please login to use wishlist", status=status.HTTP_401_UNAUTHORIZED
            )
        if int(pk) in user.wishlist.values_list(flat=True):
            user.wishlist.remove(pk)
            message = "Product removed from your wishlist"
        else:
            user.wishlist.add(pk)
            message = "Product added to your wishlist"
        user.save()
        return Response(message, status=status.HTTP_200_OK)


class ItemDetailView(generics.RetrieveAPIView):
    queryset = Item.objects.select_related("size", "color")
    serializer_class = ItemDetailSerializer
    permission_classes = (AllowAny,)
    lookup_field = "slug"
