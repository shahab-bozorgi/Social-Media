from django.urls import path
from friends.api.views import FollowView, FollowersView, FollowingsView

urlpatterns = [
    path('api/follow/', FollowView.as_view(), name='follow'),
    path('api/<str:username>/followings/', FollowingsView.as_view(), name='followings-list'),
    path('api/<str:username>/followers/', FollowersView.as_view(), name='followers-list')

]
