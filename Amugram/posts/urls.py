from django.urls import path
from posts.api.views import CreatePostView, PostImageView

urlpatterns = [
    path('api/posts/create/', CreatePostView.as_view(), name='create_post'),
    path('api/post/<int:id>/', PostImageView.as_view(), name='get_post'),
]
