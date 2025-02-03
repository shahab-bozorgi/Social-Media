from django.urls import path
from posts.api.views import CreatePostView, PostImageView, PostsView

urlpatterns = [
    path('api/posts/create/', CreatePostView.as_view(), name='create_post'),
    path('api/post/<int:id>/', PostImageView.as_view(), name='get_post'),
    path('api/posts/<str:username>/<int:page_size>/', PostsView.as_view(), name='get_posts'),
]
