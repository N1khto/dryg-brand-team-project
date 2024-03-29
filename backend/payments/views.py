import stripe

from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.viewsets import GenericViewSet
from django.conf import settings
from stripe import InvalidRequestError

from payments.models import Payment
from payments.serializers import PaymentSerializer


stripe.api_key = settings.STRIPE_SECRET_KEY
TEST_PRODUCT = "prod_Onv2XTbUzEHGrp"


class PaymentViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    GenericViewSet,
):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = (AllowAny,)

    def get_permissions(self):
        if self.action == "list":
            permission_classes = [IsAdminUser]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def get_queryset(self) -> queryset:
        queryset = self.queryset
        if not self.request.user.is_staff:
            queryset = queryset.filter(order__user__id=self.request.user.id)
        return queryset.distinct()

    @action(detail=False, methods=["get"], permission_classes=[AllowAny])
    def success(self, request) -> Response:
        """Action used to check if stripe session was paid
        and change payment status in database"""
        try:
            session = stripe.checkout.Session.retrieve(
                request.query_params.get("session_id")
            )
        except InvalidRequestError:
            return Response("Invalid stripe session")
        payment = get_object_or_404(Payment, id=request.query_params.get("payment_id"))
        payment_status = session.get("payment_status")
        if payment_status == "paid":
            payment.status = "paid"
            payment.save()
            return Response("Payment complete")
        return Response("Payment already proceeded")

    @action(detail=False, methods=["get"], permission_classes=[AllowAny])
    def cancel(self, request) -> Response:
        """Endpoint displaying message if payment is cancelled"""
        return Response(
            "Payment can be paid a bit later (the session is available for 24h)"
        )


def create_order_payment(order, request) -> None:
    """function used to receive order instance, calculate total price
    and create related payment instance. Then create new stripe checkout session
    and attach session_id and session_url to payment instance"""
    money_to_pay = order.total_price
    payment = Payment.objects.create(order=order, money_to_pay=money_to_pay)
    item_data = [
        {"price": item["stripe_product_id"], "quantity": item["quantity"]}
        for item in request.data["order_items"]
    ]
    checkout_session = stripe.checkout.Session.create(
        line_items=item_data,
        mode="payment",
        success_url=request.build_absolute_uri(
            reverse("payments:payment-success")
            + "?session_id={CHECKOUT_SESSION_ID}"
            + f"&payment_id={payment.id}"
        ),
        cancel_url=request.build_absolute_uri(reverse("payments:payment-cancel")),
    )
    payment.session_url = checkout_session.get("url")
    payment.session_id = checkout_session.get("id")
    payment.save()
