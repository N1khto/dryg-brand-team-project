# Generated by Django 5.0 on 2024-01-06 11:40

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("payments", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="payment",
            name="session_id",
            field=models.CharField(max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name="payment",
            name="session_url",
            field=models.URLField(max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name="payment",
            name="status",
            field=models.CharField(
                choices=[("pending", "Pending"), ("paid", "Paid")],
                default="pending",
                max_length=1000,
            ),
        ),
    ]