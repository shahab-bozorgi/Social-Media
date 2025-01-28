# accounts/urls.py
from django.urls import path
from accounts.api.views import RegisterView, CustomTokenObtainPairView, ProfileView, UpdateProfileView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/profile/<str:username>/', ProfileView.as_view(), name='profile-detail'),
    path('api/up/', UpdateProfileView.as_view(), name='edit_profile'),
]
