from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect

from user.form import LoginForm


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)  # Use the imported `login` function here
                return redirect('home:home')
            else:
                form.add_error(None, 'Invalid username or password')
    else:
        form = LoginForm()

    return render(request, 'user/login.html', {'form': form})


def register(request):
    return render(request, 'user/register.html')
