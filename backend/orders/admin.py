from django.contrib import admin

from orders.models import Order, OrderItem


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1


@admin.register(Order)
class ItemAdmin(admin.ModelAdmin):
    inlines = (OrderItemInline,)


admin.site.register(OrderItem)
