# accounts/serializers.py
from rest_framework import serializers

from accounts.models import User, Profile
from posts.models import Post


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', "phone", 'email', 'password']

    def create(self, validated_data):
        print(validated_data)

        user = User.objects.create_user(**validated_data)
        return user


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


class UpdateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    phone = serializers.CharField(source="user.phone")
    email = serializers.CharField(source="user.email")

    password = serializers.CharField(write_only=True, required=False)
    new_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Profile
        fields = [
            "username",
            "phone",
            "email",
            "bio",
            "first_name",
            "last_name",
            "birth_date",
            "avatar",
            "password",
            "new_password"
        ]

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        password = validated_data.pop('password', None)
        new_password = validated_data.pop('new_password', None)

        user = instance.user

        if password and new_password:
            if not user.check_password(password):
                raise serializers.ValidationError({"password": "passwords don't match"})
            user.set_password(new_password)
            user.save()

        if user_data:
            for attr, value in user_data.items():
                setattr(user, attr, value)
            user.save()



        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance




