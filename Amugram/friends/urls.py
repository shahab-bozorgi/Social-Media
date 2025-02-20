from django.urls import path

from friends.api.views import FollowView

urlpatterns = [
    path('api/follow/', FollowView.as_view(), name='follow'),


]
