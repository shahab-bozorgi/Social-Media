from django.db import models
from rest_framework.exceptions import ValidationError

from accounts.models import User


class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name="following")
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followers")
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        unique_together = ("follower", "following")

    def clean(self):
        if self.follower == self.following:
            raise ValidationError("you can\'t follow yourself")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.follower} follows {self.following}"
