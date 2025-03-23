from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from friends.models import Follow
from friends.tasks import increment_following_count, decrement_following_count
User = get_user_model()

@receiver(post_save, sender=Follow)
def handle_follow(sender, instance, created, **kwargs):
    if created:
        increment_following_count.delay(instance.id)

@receiver(post_delete, sender=Follow)
def handle_unfollow(sender, instance, **kwargs):
    decrement_following_count.delay(instance.id)
