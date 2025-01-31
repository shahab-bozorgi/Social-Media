from django.urls import path

from posts.api.views import CreatePostView

urlpatterns = [
    path('api/posts/create/', CreatePostView.as_view(), name='create_post')
]
