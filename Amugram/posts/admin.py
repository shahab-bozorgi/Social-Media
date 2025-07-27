from django.contrib import admin

from posts.models import Post, Comment, PostImage, LikePost, LikeComment
from accounts.models import ImageRecord

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(PostImage)
admin.site.register(LikePost)
admin.site.register(LikeComment)
admin.site.register(ImageRecord)
