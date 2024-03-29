# Generated by Django 5.0 on 2024-02-05 19:57

import phonenumber_field.modelfields
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="CorporateOrderMessage",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("first_name", models.CharField(blank=True, max_length=255, null=True)),
                ("last_name", models.CharField(blank=True, max_length=255, null=True)),
                ("email", models.EmailField(max_length=254)),
                (
                    "phone_number",
                    phonenumber_field.modelfields.PhoneNumberField(
                        blank=True, max_length=128, null=True, region="UA"
                    ),
                ),
                ("message", models.TextField()),
                ("date_added", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "corporate order message",
                "verbose_name_plural": "corporate order messages",
                "ordering": ["-date_added"],
            },
        ),
    ]
