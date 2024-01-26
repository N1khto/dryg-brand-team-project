# Generated by Django 5.0 on 2024-01-26 09:20

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("products", "0005_remove_item_model_item_category_item_description_and_more"),
        ("user", "0005_alter_user_first_name_alter_user_last_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="wishlist",
            field=models.ManyToManyField(
                blank=True, related_name="wishlist", to="products.item"
            ),
        ),
    ]
