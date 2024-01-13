from django.db import models

from orders.models import Order


class Payment(models.Model):
    class StatusChoices(models.TextChoices):
        PENDING = "pending"
        PAID = "paid"

    status = models.CharField(
        max_length=1000, choices=StatusChoices.choices, default="pending"
    )
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    session_url = models.URLField(max_length=1000, null=True)
    session_id = models.CharField(max_length=1000, null=True)
    money_to_pay = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self) -> str:
        return f"id: {self.session_id}. total: {self.money_to_pay}$"
