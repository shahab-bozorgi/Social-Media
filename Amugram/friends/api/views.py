from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import User
from friends.api.serializers import FollowSystem, FollowersSerializer
from friends.models import Follow


class FollowView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FollowSystem

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        follow = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FollowersView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FollowersSerializer

    def get_queryset(self, **kwargs):
        user_username = self.kwargs.get('username')
        user = get_object_or_404(User, username=user_username)
        return user.followers.all()