from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class CorporateOrderMessage(models.Model):
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField()
    phone_number = PhoneNumberField(region="UA", null=True, blank=True)
    message = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message #{self.pk} by {self.first_name} {self.last_name} on {self.date_added}"

    class Meta:
        verbose_name = "corporate order message"
        verbose_name_plural = "corporate order messages"
        ordering = ["-date_added"]
