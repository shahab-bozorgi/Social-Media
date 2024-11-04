from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect

from home.forms import UpdateAvatarForm


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