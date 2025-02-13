from django.shortcuts import get_object_or_404
from rest_framework import serializers
from posts.models import Post, PostImage, LikePost, Comment


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ["image"]


class CreatePostSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, required=False, allow_empty=False)

    class Meta:
        model = Post
        fields = [
            "images",
            "caption"
        ]

    def validate_images(self, value):
        if not value:
            raise serializers.ValidationError("At least one image is required.")
        return value

    def create(self, validated_data):
        images_data = validated_data.pop("images", [])
        post = Post.objects.create(**validated_data)

        for image_data in images_data:
            PostImage.objects.create(post=post, **image_data)

        return post


class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    avatar = serializers.ImageField(source="user.profile.avatar")
    image = ImageSerializer(source="images", many=True)

    class Meta:
        model = Post
        fields = [
            "username",
            "avatar",
            "caption",
            "image",
            "comments_count",
            "likes_count",
            "created_at",

        ]


class PostsSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)

    class Meta:
        model = Post
        fields = [
            "images"
        ]


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikePost
        fields = [
            "user",
            "post",
            "created_at"
        ]

    def create(self, validated_data):
        user = validated_data["user"]
        post = validated_data["post"]

        existing_like = LikePost.objects.filter(user=user, post=post).first()

        if existing_like:
            existing_like.delete()
            return None

        return LikePost.objects.create(**validated_data)


class CreateCommentSerializer(serializers.ModelSerializer):
    post_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Comment
        fields = ["parent", "comment", "post_id"]

    def create(self, validated_data):
        user = self.context["request"].user
        post_id = validated_data.pop("post_id")
        post = get_object_or_404(Post, id=post_id)
        return Comment.objects.create(user=user, post=post, **validated_data)


class GetCommentView(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    avatar = serializers.ImageField(source="user.profile.avatar")

    class Meta:
        model = Comment
        fields = [
            "username",
            "avatar",
            "comment",
            "parent",
            "likes_count",
            "created_at"
        ]