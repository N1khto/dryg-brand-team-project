from django.contrib import admin
from django.contrib.auth.models import Group

from products.models import Category, Image, Color, Size, Product, Item


class ImageInline(admin.TabularInline):
    model = Item.images.through
    extra = 1


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    inlines = (ImageInline,)


admin.site.register(Category)
admin.site.register(Color)
admin.site.register(Size)
admin.site.register(Product)
admin.site.register(Image)

admin.site.unregister(Group)
