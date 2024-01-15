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


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ("image",)

    def to_representation(self, instance):
        url = instance.image.url
        return f"{url}"


class ItemSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)

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


class ItemSizeAvailableSerializer(ItemSerializer):
    def to_representation(self, instance):
        size_value = instance.size.value
        return f"{size_value}"


class ItemColorAvailableSerializer(ItemSerializer):
    def to_representation(self, instance):
        color_name = instance.color.name
        return f"{color_name}"


class ProductSerializer(serializers.ModelSerializer):
    slug = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "category",
            "fabric",
            "description",
            "date_added",
            "slug",
        )

    def get_slug(self, instance):
        result = instance.items.values_list("slug", flat=True)
        if result:
            return result[0]


class ItemDetailSerializer(ItemSerializer):
    model = ProductSerializer(many=False, read_only=True)
    color = serializers.SlugRelatedField(many=False, read_only=True, slug_field="name")
    size = SizeSerializer()
    images = ImageSerializer(many=True, read_only=True)
    sizes_available = ItemSizeAvailableSerializer(many=True, source="model.items")
    colors_available = ItemColorAvailableSerializer(many=True, source="model.items")
    wishlist = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Item
        fields = (
            "id",
            "model",
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

    def get_wishlist(self, instance):
        request = self.context.get("request")
        user = request.user
        return bool(
            instance.model.id
            in instance.model.wishlist.values_list("wishlist", flat=True).filter(
                id=user.id
            )
        )


class ProductImageListingField(serializers.RelatedField):
    def to_representation(self, instance):
        return [image.image.url for image in instance.images.all()]


class ProductListSerializer(ProductSerializer):
    category = serializers.SlugRelatedField(
        many=False, read_only=True, slug_field="name"
    )
    max_price = serializers.DecimalField(max_digits=8, decimal_places=2)
    images = serializers.SerializerMethodField()
    wishlist = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "category",
            "fabric",
            "max_price",
            "description",
            "date_added",
            "images",
            "wishlist",
            "slug",
        )

    def get_wishlist(self, instance):
        request = self.context.get("request")
        user = request.user
        return bool(
            instance.id
            in instance.wishlist.values_list("wishlist", flat=True).filter(id=user.id)
        )

    def get_images(self, instance):
        results = Image.objects.filter(item__model__id=instance.pk).distinct()
        return ImageSerializer(results, many=True).data


class ItemOrderHistorySerializer(ItemSerializer):
    images = ImageSerializer(many=True, read_only=True)
    model = serializers.SlugRelatedField(many=False, read_only=True, slug_field="name")
    size = serializers.SlugRelatedField(many=False, read_only=True, slug_field="value")

    class Meta:
        model = Item
        fields = (
            "id",
            "slug",
            "model",
            "color",
            "size",
            "stock",
            "price",
            "stripe_product_id",
            "date_added",
            "images",
        )
