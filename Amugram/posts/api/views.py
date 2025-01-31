from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from posts.api.serializers import CreatePostSerializer
from posts.models import Post, PostImage


class CreatePostView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        images = request.FILES.getlist("images")

        if not images:
            return Response({"images": ["At least one image is required."]}, status=status.HTTP_400_BAD_REQUEST)

        serializer = CreatePostSerializer(data=data)
        if serializer.is_valid():
            post = serializer.save(user=request.user)

            for image in images:
                PostImage.objects.create(post=post, image=image)

            return Response(CreatePostSerializer(post).data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



