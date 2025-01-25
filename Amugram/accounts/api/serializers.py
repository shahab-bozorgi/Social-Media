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
        fields = ["phone", "password"]
class ProfileSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source="user.phone")
    class Meta:
        model = Profile
        fields = [
            "phone",
            "first_name",
            "last_name",
            # "avatar",
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


# class EditProfileSerializer(serializers.Serializer):
#     user = UserDetailSerializer()
#     profile = ProfileSerializer()
#
#     password = serializers.CharField(write_only=True, required=False)
#     new_password = serializers.CharField(write_only=True, required=False)
#
#     def validate_password(self, value):
#         user = self.instance.user
#         if value and not user.check_password(value):
#             raise serializers.ValidationError("پسورد فعلی شما اشتباه است.")
#         return value
#
#     def update(self, instance, validated_data):
#         user = instance.user
#
#         # به روزرسانی پسورد جدید
#         new_password = validated_data.pop("new_password", None)
#         current_password = validated_data.pop("password", None)
#
#         if new_password:
#             if not current_password:
#                 raise serializers.ValidationError(
#                     {"password": "پسورد فعلی نباید خالی باشد."}
#                 )
#             if not user.check_password(current_password):
#                 raise serializers.ValidationError(
#                     {"password": "پسورد فعلی شما اشتباه است."}
#                 )
#             user.set_password(new_password)
#             user.save()
#
#         # به روزرسانی پروفایل
#         profile_data = validated_data.pop("avatar", None)  # پروفایل را از داده‌ها جدا می‌کنیم
#
#         if profile_data:
#             profile = user.profile  # اینجا به profile از مدل User دسترسی پیدا می‌کنیم
#             for attr, value in profile_data.items():
#                 setattr(profile, attr, value)  # به‌روزرسانی فیلدهای پروفایل
#             profile.save()
#
#         # به روزرسانی اطلاعات کاربر
#         for attr, value in validated_data.items():
#             setattr(user, attr, value)
#         user.save()
#
#         return instance
#
