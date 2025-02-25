from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import User
from friends.api.serializers import FollowSystem, FollowersSerializer, FollowingsSerializer, BlocksSerializer
from friends.models import Follow, Block


class FollowView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FollowSystem

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        follow = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FollowingsView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FollowingsSerializer

    def get_queryset(self, **kwargs):
        user_username = self.kwargs.get('username')
        user = get_object_or_404(User.objects.select_related(), username=user_username)
        return user.following.all()


class FollowersView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FollowersSerializer

    def get_queryset(self, **kwargs):
        user_username = self.kwargs.get('username')
        user = get_object_or_404(User.objects.select_related(), username=user_username)
        return user.followers.all()


class BlockUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        blocked_username = request.data.get('blocked')

        # بررسی وجود کاربر موردنظر
        try:
            blocked_user = User.objects.get(username=blocked_username)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        # بررسی اینکه کاربر خودش را بلاک نکند
        if request.user == blocked_user:
            return Response({"error": "You cannot block yourself."}, status=status.HTTP_400_BAD_REQUEST)

        # بررسی اینکه کاربر قبلاً بلاک نشده باشد
        if Block.objects.filter(blocker=request.user, blocked=blocked_user).exists():
            return Response({"error": "User is already blocked."}, status=status.HTTP_400_BAD_REQUEST)

        # ایجاد بلاک
        block_instance = Block.objects.create(blocker=request.user, blocked=blocked_user)

        return Response({"message": "User blocked successfully."}, status=status.HTTP_201_CREATED)
