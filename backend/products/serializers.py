from rest_framework import serializers

from products.models import Category, Image, Color, Size, Product, Item


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


class SizeListingField(serializers.RelatedField):
    def to_representation(self, value):
        url = value.image.url
        return f"{url}"


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ("image",)


class ImageListingField(serializers.RelatedField):
    def to_representation(self, instance):
        url = instance.image.url
        return f"{url}"


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ("id", "model", "color", "size", "stock", "price", "stripe_product_id", "date_added")


class ItemSizeAvailableSerializer(ItemSerializer):
    class Meta:
        model = Item

    def to_representation(self, instance):
        size_value = instance.size.value
        return f"{size_value}"


class ItemColorAvailableSerializer(ItemSerializer):
    class Meta:
        model = Item

    def to_representation(self, instance):
        color_name = instance.color.name
        return f"{color_name}"


class ItemListSerializer(ItemSerializer):
    model = serializers.SlugRelatedField(many=False, read_only=True, slug_field="name")
    color = serializers.SlugRelatedField(many=False, read_only=True, slug_field="name")
    size = SizeSerializer()
    images = ImageListingField(many=True, read_only=True)

    class Meta:
        model = Item
        fields = ("id", "model", "color", "size", "stock", "price", "stripe_product_id", "date_added", "images")


class ItemDetailSerializer(ItemSerializer):
    model = serializers.SlugRelatedField(many=False, read_only=True, slug_field="name")
    color = serializers.SlugRelatedField(many=False, read_only=True, slug_field="name")
    size = SizeSerializer()
    images = ImageListingField(many=True, read_only=True)
    sizes_available = ItemSizeAvailableSerializer(many=True, source="model.items")
    colors_available = ItemColorAvailableSerializer(many=True, source="model.items")

    class Meta:
        model = Item
        fields = ("id", "model", "color", "size", "stock", "price", "stripe_product_id", "date_added", "images", "sizes_available", "colors_available")


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("id", "name", "category", "fabric", "description", "date_added")


class ProductListSerializer(ProductSerializer):
    category = serializers.SlugRelatedField(many=False, read_only=True, slug_field="name")
    max_price = serializers.DecimalField(max_digits=8, decimal_places=2)
    items = ItemListSerializer(many=True, )

    class Meta:
        model = Product
        fields = ("id", "name", "category", "fabric", "max_price", "description", "date_added", "items")
