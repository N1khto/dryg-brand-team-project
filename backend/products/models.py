from autoslug import AutoSlugField
from django.core.validators import MinValueValidator
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(default="Category description...")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class Color(models.Model):
    name = models.CharField(max_length=255)
    hex = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class Size(models.Model):
    class SizeValueChoices(models.TextChoices):
        XS = "xs"
        S = "s"
        M = "m"
        L = "l"
        XL = "xl"
        XXL = "xxl"
        XXXL = "xxxl"
        OVERSIZE = "oversize"

    tag = models.CharField(max_length=255, help_text="please mark related product")
    value = models.CharField(max_length=15, choices=SizeValueChoices.choices)
    length = models.PositiveSmallIntegerField(null=True, blank=True)
    width = models.PositiveSmallIntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.value} for {self.tag}"


def compose_slug(instance):
    return f"{instance.name}-{instance.color.name}-{instance.size.value}"


class Item(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    fabric = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True, default="")
    date_added = models.DateTimeField(auto_now_add=True)
    color = models.ForeignKey(
        Color, null=True, on_delete=models.SET_NULL, related_name="items"
    )
    size = models.ForeignKey(
        Size, null=True, on_delete=models.SET_NULL, related_name="items"
    )
    slug = AutoSlugField(
        populate_from=compose_slug, unique=True, null=True, default=None
    )
    stock = models.PositiveSmallIntegerField(default=0)
    price = models.DecimalField(
        max_digits=8, decimal_places=2, null=True, validators=[MinValueValidator(0)]
    )
    stripe_product_id = models.CharField(max_length=255, blank=True, default="")
    related_items = models.ManyToManyField("self", symmetrical=True, blank=True)

    def __str__(self):
        return f"{self.name} {self.color} {self.size.value}"

    @property
    def sizes_available(self):
        return [*self.related_items.values_list("size__value", flat=True)] + [
            self.size.value
        ]

    @property
    def colors_available(self):
        return [*self.related_items.values_list("color__name", flat=True)] + [
            self.color.name
        ]


class Image(models.Model):
    item = models.ManyToManyField(Item, related_name="images", blank=True)
    image = models.ImageField(upload_to="images/")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=255, null=True, blank=True)
