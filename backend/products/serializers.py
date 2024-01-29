from rest_framework import serializers

from products.models import Category, Image, Color, Size, Item


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "description")


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ("id", "name", "hex")


class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ("id", "tag", "value", "length", "width")


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ("image",)

    def to_representation(self, instance):
        url = instance.image.url
        return f"{url}"


class ItemSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    category = serializers.SlugRelatedField(
        many=False, read_only=True, slug_field="name"
    )

    class Meta:
        model = Item
        fields = (
            "id",
            "model",
            "color",
            "size",
            "stock",
            "price",
            "stripe_product_id",
            "date_added",
            "images",
        )


class ItemDetailSerializer(ItemSerializer):
    color = serializers.SlugRelatedField(many=False, read_only=True, slug_field="name")
    size = SizeSerializer()
    images = ImageSerializer(many=True, read_only=True)
    wishlist = serializers.BooleanField(read_only=True, default=False)

    class Meta:
        model = Item
        fields = (
            "id",
            "name",
            "category",
            "fabric",
            "description",
            "color",
            "size",
            "slug",
            "stock",
            "price",
            "stripe_product_id",
            "date_added",
            "images",
            "sizes_available",
            "colors_available",
            "wishlist",
        )


class ItemListSerializer(ItemSerializer):
    wishlist = serializers.BooleanField(read_only=True, default=False)

    class Meta:
        model = Item
        fields = (
            "id",
            "name",
            "category",
            "fabric",
            "price",
            "description",
            "date_added",
            "images",
            "slug",
            "wishlist",
        )


class ItemOrderHistorySerializer(ItemSerializer):
    images = ImageSerializer(many=True, read_only=True)
    size = serializers.SlugRelatedField(many=False, read_only=True, slug_field="value")
    color = serializers.SlugRelatedField(many=False, read_only=True, slug_field="name")

    class Meta:
        model = Item
        fields = (
            "id",
            "slug",
            "name",
            "color",
            "size",
            "stock",
            "price",
            "stripe_product_id",
            "date_added",
            "images",
        )
