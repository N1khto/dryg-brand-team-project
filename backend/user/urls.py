from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from user.views import (
    CreateUserView,
    ManageUserView,
    APILogoutView,
    AddUserAddress,
    UserOrderHistoryView,
    UserWishlistView,
)

urlpatterns = [
    path("register/", CreateUserView.as_view(), name="create"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("me/", ManageUserView.as_view(), name="manage"),
    path("me/address", AddUserAddress.as_view(), name="address"),
    path("me/order_history", UserOrderHistoryView.as_view(), name="order_history"),
    path("me/wishlist", UserWishlistView.as_view(), name="wishlist"),
    path("logout/", APILogoutView.as_view(), name="auth_logout"),
]

app_name = "users"
