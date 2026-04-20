from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ClientProjectViewSet, DocumentViewSet, EnquiryViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='projects')
router.register(r'client/projects', ClientProjectViewSet, basename='client-projects')
router.register(r'documents', DocumentViewSet, basename='documents')
router.register(r'enquiries', EnquiryViewSet, basename='enquiries')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
