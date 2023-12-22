from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(default="Category description...")

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    fabric = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True, default="")
    added = models.DateTimeField(auto_now_add=True)
