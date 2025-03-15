from django.urls import path
from user_notifications.api.views import NotificationListView

urlpatterns = [
    path('api/notif/', NotificationListView.as_view(), name='notifications-list'),
]
