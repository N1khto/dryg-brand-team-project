from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

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

    user = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="orders", null=True
    )
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=63, choices=OrderStatusChoices.choices, default="awaiting payment"
    )
    delivery_region = models.CharField(max_length=255)
    delivery_city = models.CharField(max_length=255)
    delivery_nova_post_department = models.PositiveSmallIntegerField(default=1)
    customer_first_name = models.CharField(max_length=255)
    customer_last_name = models.CharField(max_length=255)
    customer_email = models.EmailField(blank=True, null=True)
    customer_phone = PhoneNumberField(region="UA")

    @property
    def total_price(self):
        return sum([_.item_price for _ in self.order_items.all()])

    def __str__(self):
        return f"Order #{self.pk} from {self.order_date}. Total {self.total_price} usd. Status: {self.status}"


class OrderItem(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="order_items")
    quantity = models.PositiveSmallIntegerField(
        default=1, validators=[MinValueValidator(1)]
    )
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="order_items"
    )

    @staticmethod
    def validate_item(quantity, item, error_to_raise):
        if quantity > item.stock:
            raise error_to_raise(
                f"Requested amount of {item.model.name} is more than we have in stock"
            )

    def clean(self):
        OrderItem.validate_item(
            self.quantity,
            self.item,
            ValidationError,
        )

    def save(
        self,
        force_insert=False,
        force_update=False,
        using=None,
        update_fields=None,
    ):
        self.full_clean()
        return super(OrderItem, self).save(
            force_insert, force_update, using, update_fields
        )

    @property
    def item_price(self):
        total_item_price = self.item.price * self.quantity
        return total_item_price

    def __str__(self):
        return f"{self.item.name} - {self.quantity} pieces for {self.item_price}. Order #{self.order.id}"
