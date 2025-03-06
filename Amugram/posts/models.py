from django.db import models
from accounts.models import User, Profile
from posts.tasks import compress_image


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    caption = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    likes_count = models.PositiveIntegerField(default=0)
    comments_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user}, {self.caption},    {self.id}"

    class Meta:
        verbose_name = "Post"
        verbose_name_plural = "Posts"
        ordering = ['-created_at']


class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to="posts/")

    def __str__(self):
        return f"{self.post.id}, {self.post.__sizeof__()}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        compress_image.delay(self.id)

    def get_image_size(self):
        return self.image.size



class Comment(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='comment',
        verbose_name='User'
    )
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name='comments',
        verbose_name="Post"
    )
    comment = models.TextField()
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='replies',
        verbose_name="Parent Comment"
    )
    likes_count = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField("Updated at", auto_now=True)

    def __str__(self):
        return f"Comment by {self.user.username} on {self.post_id}, comment: {self.id}"

    class Meta:
        verbose_name = "Comment"
        verbose_name_plural = "Comments"
        ordering = ['-created_at']


class LikePost(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='like_posts'
    )
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name='likes_on_posts'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Liked by {self.user},  for {self.post}, and Like_id {self.id}"


    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'post'],
                name='unique_user_post_like',
                condition=models.Q(post__isnull=False),
            ),
        ]


class LikeComment(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='likes_comments'
    )
    comment = models.ForeignKey(
        Comment,
        on_delete=models.CASCADE,
        related_name='likes_on_comment'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Liked by {self.user},  for {self.comment}, and Like_id {self.id}"

    def clean(self):
        if not self.comment and not self.comment:
            raise ValueError(
                'A Like must be associated with either a post or a comment, not both.'
            )
        if self.comment and self.comment:
            raise ValueError(
                'A Like cannot be associated with both a post and a comment simultaneously.'
            )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'comment'],
                name='unique_user_comment_like',
                condition=models.Q(comment__isnull=False),
            ),
        ]