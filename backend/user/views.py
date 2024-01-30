from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.token_blacklist.models import (
    OutstandingToken,
    BlacklistedToken,
)
from rest_framework_simplejwt.tokens import RefreshToken

from user.models import User
from user.serializers import (
    UserSerializer,
    UserAddAddressSerializer,
    UserOrderHistorySerializer,
    UserNameUpdateSerializer,
    UserWishlistSerializer,
)


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserNameUpdateSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self) -> User:
        return self.request.user


class AddUserAddress(generics.UpdateAPIView):
    serializer_class = UserAddAddressSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self) -> User:
        return self.request.user


class APILogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        if self.request.data.get("all"):
            token: OutstandingToken
            for token in OutstandingToken.objects.filter(user=request.user):
                _, _ = BlacklistedToken.objects.get_or_create(token=token)
            return Response({"status": "OK, goodbye, all refresh tokens blacklisted"})
        refresh_token = self.request.data.get("refresh")
        token = RefreshToken(token=refresh_token)
        token.blacklist()
        return Response({"status": "OK, goodbye"})


class UserOrderHistoryView(generics.RetrieveAPIView):
    serializer_class = UserOrderHistorySerializer
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()

    def get_object(self) -> User:
        return self.request.user


class UserWishlistView(generics.RetrieveAPIView):
    serializer_class = UserWishlistSerializer
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()

    def get_object(self) -> User:
        return self.request.user
