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
        fields = ("id", "item", "image", "uploaded_at")


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("id", "name", "category", "fabric", "description", "date_added")


