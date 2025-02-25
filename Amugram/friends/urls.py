from django.urls import path
from friends.api.views import FollowView, FollowersView

urlpatterns = [
    path('api/follow/', FollowView.as_view(), name='follow'),
    path('api/<str:username>/followers/', FollowersView.as_view(), name='followers-list')

]
