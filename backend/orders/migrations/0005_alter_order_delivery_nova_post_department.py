# Generated by Django 5.0 on 2024-02-05 13:49

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("orders", "0004_remove_order_delivery_region"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="delivery_nova_post_department",
            field=models.CharField(max_length=255),
        ),
    ]
