from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404

from home.forms import UpdateAvatarForm
from user.models import CustomUser


@login_required (login_url='user:login')
def home(request):
    return render(request, 'home/index.html')



@login_required
def update_avatar(request):
    if request.method == 'POST':
        form = UpdateAvatarForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('home:update_avatar')
    else:
        form = UpdateAvatarForm(instance=request.user)
    return render(request, 'home/index.html', {'form': form})

@login_required
def profiles(request, username):
    user = get_object_or_404(CustomUser, username=username)
    return render(request, 'home/profiles.html', {'user': user})