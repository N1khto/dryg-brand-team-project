from rest_framework import routers

from merch.views import CorporateOrderMessageViewSet


router = routers.DefaultRouter()
router.register("", CorporateOrderMessageViewSet)

urlpatterns = router.urls

app_name = "merch"
