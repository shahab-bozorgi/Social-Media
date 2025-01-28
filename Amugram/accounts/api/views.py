from django.contrib.auth import get_user_model
from django.db.migrations import serializer
from django.shortcuts import get_object_or_404
from rest_framework import status, generics
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers import UserSerializer, ProfileSerializer, PublicProfileSerializer, \
    UpdateSerializer
from ..models import User, Profile

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()

        Profile.objects.create(user=user)

        return user

class CustomTokenObtainPairView(TokenObtainPairView):
    pass

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected view!"})





class ProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        username = kwargs.get('username')
        user = get_object_or_404(User.objects.select_related("profile"), username=username)

        if request.user != user:
            profile_serializer = PublicProfileSerializer(user.profile)
        else:
            profile_serializer = ProfileSerializer(user.profile)

        return Response(profile_serializer.data, status=status.HTTP_200_OK)


class UpdateProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateSerializer

    def get_user(self):
        return self.request.user.profile

    def patch(self, request, *args, **kwargs):
        serializer = self.get_serializer(self.get_user(), data=request.data, partial=True,)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)




