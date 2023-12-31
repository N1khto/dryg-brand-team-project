# Generated by Django 5.0 on 2024-01-07 19:19

import phonenumber_field.modelfields
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0003_order_delivery_city_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="customer_email",
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AddField(
            model_name="order",
            name="customer_first_name",
            field=models.CharField(default="Vasja", max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="order",
            name="customer_last_name",
            field=models.CharField(default="Petechkin", max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="order",
            name="customer_phone",
            field=phonenumber_field.modelfields.PhoneNumberField(
                blank=True, max_length=128, null=True, region="UA"
            ),
        ),
    ]
