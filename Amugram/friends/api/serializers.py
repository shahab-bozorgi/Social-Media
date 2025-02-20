from rest_framework import serializers
from accounts.models import User
from friends.models import Follow


class FollowSystem(serializers.ModelSerializer):

    class Meta:
        model = Follow

        fields = [
            'following',
        ]

    def validate_following(self, value):
        request = self.context.get('request')
        follower = request.user if request else None
        if request and request.user == value:
            raise serializers.ValidationError("You can't follow yourself.")

        if Follow.objects.filter(follower=follower, following=value).exists():
            raise serializers.ValidationError("You are already following this user!")

        return value

    def create(self, validated_data):
        request = self.context.get('request')
        follower = request.user if request else None

        follow = Follow.objects.create(follower=follower, **validated_data)
        return follow

