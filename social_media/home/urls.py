from django.urls import path
from . import views


app_name = 'home'
urlpatterns = [
    path('home', views.home, name='home'),
    path('profile/update/avatar', views.update_avatar, name='update_avatar')
]
