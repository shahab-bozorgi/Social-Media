from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from posts.api.serializers import CreatePostSerializer, PostSerializer, PostsSerializer, LikeSerializer
from posts.models import Post, PostImage, LikePost
from utils.utils import StandardResultsSetPagination


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


class DeletePostView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        post_id = kwargs.get('post_id')
        post = get_object_or_404(Post.objects.select_related(), id=post_id)

        if post.user != request.user:
            return Response({"detail": "You do not have permission to delete this post."},
                            status=status.HTTP_403_FORBIDDEN)
        post.delete()

        return Response({"deleted": "Post deleted"}, status=status.HTTP_200_OK)


class PostImageView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer

    def get(self, request, id):
        post = get_object_or_404(Post.objects.select_related(), id=id)
        serializer = PostSerializer(post)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class PostsView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostsSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        username = self.kwargs.get('username')
        return Post.objects.select_related('user')\
            .prefetch_related('images')\
            .filter(user__username=username)

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)


class CreateLikeView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LikeSerializer

    def post(self, request, *args, **kwargs):
        post_id = kwargs.get('post_id')
        post = get_object_or_404(Post, id=post_id)

        like, created = LikePost.objects.get_or_create(user=request.user, post=post)
        if not created:
            return Response({"detail": "You have already liked this post."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Post liked successfully."}, status=status.HTTP_201_CREATED)


class DeleteLikeView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LikeSerializer

    def delete(self, request, *args, **kwargs):
        post_id = kwargs.get('post_id')
        post = get_object_or_404(Post.objects.select_related(), id=post_id)

        like = LikePost.objects.filter(user=request.user, post=post).first()

        if not like:
            return Response({"detail": "You haven't liked this post."}, status=status.HTTP_400_BAD_REQUEST)

        like.delete()

        return Response({"detail": "Post disliked successfully."}, status=status.HTTP_200_OK)
