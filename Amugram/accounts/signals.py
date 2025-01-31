from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from posts.models import Post

@receiver(post_save, sender=Post)
def update_posts_count_on_add(sender, instance, created, **kwargs):
    if created:
        user_profile = instance.user.profile  # گرفتن پروفایل از user
        user_profile.posts_count += 1
        user_profile.save()

@receiver(post_delete, sender=Post)
def update_posts_count_on_delete(sender, instance, **kwargs):
    user_profile = instance.user.profile  # گرفتن پروفایل از user
    user_profile.posts_count -= 1
    user_profile.save()
