from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny

from merch.models import CorporateOrderMessage
from merch.serializers import CorporateOrderMessageSerializer


class CorporateOrderMessageViewSet(
    mixins.CreateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = CorporateOrderMessage.objects.all()
    serializer_class = CorporateOrderMessageSerializer
    permission_classes = (AllowAny,)
