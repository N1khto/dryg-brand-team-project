from django.urls import path

from products.views import ProductListView, ItemDetailView, ProductWishlistView

urlpatterns = [
    path("products/", ProductListView.as_view(), name="products"),
    path("products/<int:pk>/wishlist", ProductWishlistView.as_view(), name="wishlist"),
    path("products/<slug:slug>", ItemDetailView.as_view(), name="products_detail"),
]

app_name = "shop"
