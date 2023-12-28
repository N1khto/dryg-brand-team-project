from django.contrib.auth import get_user_model
from django.db import models

from products.models import Item


class Order(models.Model):
    class OrderStatusChoices(models.TextChoices):
        AWAITING_PAYMENT = "awaiting payment"
        PAYMENT_RECEIVED = "payment received"
        SHIPPED = "shipped"
        COMPLETED = "completed"
        REFUNDED = "refunded"
        CANCELED = "canceled"
        FAILED = "failed"

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="orders")
    order_date = models.DateTimeField(auto_now_add=True)
    total_price = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    status = models.CharField(max_length=63, choices=OrderStatusChoices.choices, default="awaiting payment")

    def __str__(self):
        return f"Order #{self.pk} from {self.order_date}. Total {self.total_price} usd. Status: {self.status}"


class OrderItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="order_items")
    quantity = models.PositiveSmallIntegerField()
    price = models.DecimalField(max_digits=8, decimal_places=2, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_items")

    def __str__(self):
        return f"{self.item.model.name} - {self.quantity} pieces for {self.price}. Order #{self.order.id}"
