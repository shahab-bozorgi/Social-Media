from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from friends.models import Follow
from .models import Notification
from django.contrib.auth import get_user_model
from .tasks import create_notification, delete_notification

User = get_user_model()

@receiver(post_save, sender=User)
def new_user_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance,
            message="Welcome to our platform! 🎉"
        )

# @receiver(post_save, sender=Follow)
# def new_followed_notification(sender, instance, created, **kwargs):
#     if created:
#         Notification.objects.create(
#             user=instance.following,
#             message=f"{instance.follower.username} followed you!"
#         )


@receiver(post_save, sender=Follow)
def new_followed_notification(sender, instance, created, **kwargs):
    if created:
        create_notification.delay(instance.id)


# @receiver(post_delete, sender=Follow)
# def delete_follow_notification(sender, instance, **kwargs):
#     delete_notification.delay(instance.id)