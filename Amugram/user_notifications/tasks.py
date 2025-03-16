from celery import shared_task
from django.contrib.auth import get_user_model
from friends.models import Follow
from user_notifications.models import Notification


@shared_task
def create_notification(follow_id):
    try:
        follow = Follow.objects.get(id=follow_id)
        Notification.objects.create(
            user=follow.following,
            message=f'{follow.follower.username} followed you!'
        )
    except Follow.DoesNotExist:
        pass


@shared_task
def delete_notification(follow_id):
    try:
        follow = Follow.objects.get(id=follow_id)

        # تغییر از get() به filter() برای پیدا کردن همه نوتیفیکیشن‌ها
        notifications_to_delete = Notification.objects.filter(follow=follow)
        deleted_count, _ = notifications_to_delete.delete()

        # لاگ برای حذف نوتیفیکیشن‌ها
        if deleted_count > 0:
            print(f"{deleted_count} notifications deleted for Follow id: {follow_id}")
        else:
            print(f"No notifications found for Follow id: {follow_id}")

    except Follow.DoesNotExist:
        print(f"Follow with id {follow_id} does not exist.")
    except Exception as e:
        print(f"Error occurred while deleting notifications: {e}")

