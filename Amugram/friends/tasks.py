from celery import shared_task
from django.contrib.auth import get_user_model
from django.db.models import F

from accounts.models import Profile

User = get_user_model()

@shared_task
def increment_following_count(user_id):
    User.objects.filter(id=user_id).update(following_count=F('following_count') + 1)

@shared_task
def decrement_following_count(user_id):
    User.objects.filter(id=user_id).update(following_count=F('following_count') - 1)