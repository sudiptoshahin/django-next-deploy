from django.contrib import admin
from django.urls import path, include
# API docs
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView


api_v1 = [
    path('auth/', include('user.api.urls')),
]

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/v1/', include(api_v1)),
    
    # API Docs (disable in production via env var)
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
