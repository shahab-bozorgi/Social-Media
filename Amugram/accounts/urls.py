# accounts/urls.py
from django.urls import path
from accounts.api.views import RegisterView, CustomTokenObtainPairView, ProfileView, EditProfileView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/<str:username>/', ProfileView.as_view(), name='profile-detail'),
    path('api/profile/edit/', EditProfileView.as_view(), name='edit_profile'),
]
