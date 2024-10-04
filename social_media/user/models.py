from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=25)
    email = models.EmailField()
    password = models.CharField(max_length=25)

    def __str__(self):
        return self.user.username
