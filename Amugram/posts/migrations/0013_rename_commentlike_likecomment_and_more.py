# Generated by Django 5.1.5 on 2025-02-03 11:00

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0012_commentlike_postlike_delete_likeposts_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='CommentLike',
            new_name='LikeComment',
        ),
        migrations.RenameModel(
            old_name='PostLike',
            new_name='LikePost',
        ),
    ]
