# Generated by Django 5.0 on 2024-01-07 14:10

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("user", "0004_user_phone_number"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="first_name",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name="user",
            name="last_name",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]