# accounts/serializers.py
from rest_framework import serializers

from accounts.models import User, Profile


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', "phone", 'email', 'password']

    def create(self, validated_data):
        print(validated_data)

        user = User.objects.create_user(**validated_data)
        return user

class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["phone"]
class ProfileSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source="user.phone")
    class Meta:
        model = Profile
        fields = [
            "phone",
            "first_name",
            "last_name",
            "avatar",
            "bio",
            "followers_count",
            "followings_count",
            "posts_count",
        ]

class PublicProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "first_name",
            "last_name",
            "avatar",
            "bio",
            "followers_count",
            "followings_count",
            "posts_count",
        ]


