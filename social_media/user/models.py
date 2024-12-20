from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        if not username:
            raise ValueError(_('The Username field must be set'))
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(username, email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    fullname = models.CharField(_('full name'), max_length=30, blank=True)
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    banner = models.ImageField(upload_to='banner/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        help_text=_('The groups this user belongs to. A user will get all permissions granted to each of their groups.'),
        related_name='customuser_group_set'
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name='customuser_permission_set'
    )


    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username


# class Profile(models.Model):
#     user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')
#     username = models.CharField(max_length=30, unique=True)
#     avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
#     banner = models.ImageField(upload_to='banner/')
#     is_following = models.BooleanField(default=False)
#     following_Count = models.IntegerField(default=0)
#     followers_Count = models.IntegerField(default=0)
#
#     def __str__(self):
#         return self.username



# @receiver(post_save, sender=CustomUser)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)
#
# @receiver(post_save, sender=CustomUser)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()