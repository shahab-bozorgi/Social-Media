from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import User
from friends.api.serializers import FollowSystem
from friends.models import Follow


class FollowView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FollowSystem

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        follow = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)



