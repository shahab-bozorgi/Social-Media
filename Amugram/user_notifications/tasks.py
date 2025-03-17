from celery import shared_task
from django.contrib.auth import get_user_model
from friends.models import Follow
from user_notifications.models import Notification


@shared_task
def create_notification(follow_id):
    try:
        follow = Follow.objects.get(id=follow_id)
        Notification.objects.create(
            user=follow.following,
            message=f'{follow.follower.username} followed you!'
        )
    except Follow.DoesNotExist:
        pass

@shared_task
def delete_unfollow_notification_task(following_id, follower_username):
    Notification.objects.filter(
        user_id=following_id,
        message=f'{follower_username} followed you!'
    ).delete()



