from rest_framework import routers

from products.views import ProductViewSet, ItemViewSet

router = routers.DefaultRouter()
router.register("products", ProductViewSet)
router.register("items", ItemViewSet)

urlpatterns = router.urls

app_name = "shop"
