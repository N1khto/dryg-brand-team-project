# Generated by Django 5.0 on 2024-01-01 14:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0006_remove_order_total_price_remove_orderitem_price_and_more"),
        ("payments", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="payment",
            name="order",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE, to="orders.order"
            ),
        ),
    ]