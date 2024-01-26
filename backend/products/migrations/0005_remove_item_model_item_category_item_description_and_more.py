# Generated by Django 5.0 on 2024-01-26 09:20

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("products", "0004_alter_image_item"),
        ("user", "0005_alter_user_first_name_alter_user_last_name"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="item",
            name="model",
        ),
        migrations.AddField(
            model_name="item",
            name="category",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="products.category",
            ),
        ),
        migrations.AddField(
            model_name="item",
            name="description",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="item",
            name="fabric",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="item",
            name="name",
            field=models.CharField(default="test", max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="item",
            name="price",
            field=models.DecimalField(
                decimal_places=2,
                max_digits=8,
                null=True,
                validators=[django.core.validators.MinValueValidator(0)],
            ),
        ),
        migrations.DeleteModel(
            name="Product",
        ),
    ]
