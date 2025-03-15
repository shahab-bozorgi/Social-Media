from django.db.models.signals import post_save
from django.dispatch import receiver

from friends.models import Follow
from .models import Notification
from django.contrib.auth import get_user_model

User = get_user_model()

@receiver(post_save, sender=User)
def new_user_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance,
            message="Welcome to our platform! 🎉"
        )

@receiver(post_save, sender=Follow)
def new_followed_notification(sender, instance, created, **kwargs):
    if created:
        print(f"✅ New follow detected: {instance.follower} followed {instance.following}")
        Notification.objects.create(
            user=instance.following,
            message=f"{instance.follower.username} followed you!"
        )