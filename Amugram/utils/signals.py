from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from posts.models import Post, LikePost, Comment


@receiver(post_save, sender=Post)
def update_posts_count_on_add(sender, instance, created, **kwargs):
    if created:
        user_profile = instance.user.profile
        user_profile.posts_count += 1
        user_profile.save()


@receiver(post_delete, sender=Post)
def update_posts_count_on_delete(sender, instance, **kwargs):
    user_profile = instance.user.profile
    user_profile.posts_count -= 1
    user_profile.save()


@receiver(post_save, sender=LikePost)
def update_like_count_on_add(sender, instance, created, **kwargs):
    if created:
        instance.post.likes_count += 1
        instance.post.save()


@receiver(post_delete, sender=LikePost)
def update_like_count_on_delete(sender, instance, **kwargs):
    instance.post.likes_count -= 1
    instance.post.save()


@receiver(post_save, sender=Comment)
def update_comment_count_on_add(sender, instance, created, **kwargs):
    if created:
        instance.post.comments_count += 1
        instance.post.save()


@receiver(post_delete, sender=Comment)
def update_comment_count_on_delete(sender, instance, **kwargs):
    instance.post.comments_count -= 1
    instance.post.save()