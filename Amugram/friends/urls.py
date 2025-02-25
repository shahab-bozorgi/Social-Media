from django.urls import path
from friends.api.views import FollowView, FollowersView, FollowingsView, BlockUserView

urlpatterns = [
    path('api/follow/', FollowView.as_view(), name='follow'),
    path('api/<str:username>/followings/', FollowingsView.as_view(), name='followings-list'),
    path('api/<str:username>/followers/', FollowersView.as_view(), name='followers-list'),
    path('api/<str:username>/block/', BlockUserView.as_view(), name='block'),

]
