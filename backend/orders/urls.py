from django.urls import path
from rest_framework import routers

from orders.views import OrderViewSet, OrderAddInfoView

router = routers.DefaultRouter()
router.register("", OrderViewSet)

urlpatterns = [path("<int:pk>/add_info", OrderAddInfoView.as_view(), name="add_info")]

urlpatterns += router.urls

app_name = "orders"
