from rest_framework import serializers
from posts.models import Post, PostImage


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

# class CreatePostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = ["user", "images", "caption"]
#
#     def create(self, validated_data):
#         validated_data['user'] = self.context['request'].user
#         post = Post.objects.create(**validated_data)
#         return post


# class PostSerializer(serializers.ModelSerializer):
#     username = serializers.CharField(source="user.username")
#     avatar = serializers.CharField(source="user.avatar")
#
#     class Meta:
#         model = Post
#         fields = [
#             "username",
#             "avatar",
#             "images",
#             "caption",
#             "comments_count",
#             "likes_count",
#             "created_at"
#         ]