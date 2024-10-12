from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.shortcuts import render, redirect

from user.forms import LoginForm, RegistrationForm


def login_user(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home:home')
            else:
                form.add_error(None, 'Invalid username or password')
    else:
        form = LoginForm()

    return render(request, 'user/login.html', {'form': form})






def register_user(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            # بررسی رمز عبور و تأیید آن
            if form.cleaned_data['password'] != form.cleaned_data['password_confirm']:
                form.add_error('password_confirm', 'Passwords do not match.')
                return render(request, 'user/register.html', {'form': form})

            # ایجاد کاربر جدید
            user = User(
                full_name=form.cleaned_data['full_name'],
                username=form.cleaned_data['username'],
                email=form.cleaned_data['email'],
            )
            user.set_password(form.cleaned_data['password'])  # رمز عبور را با متد set_password تنظیم کنید
            user.save()  # کاربر را ذخیره کنید
            return redirect('home:home')  # به صفحه اصلی هدایت کنید

    else:
        form = RegistrationForm()  # فرم جدید اگر متد POST نباشد

    return render(request, 'user/register.html', {'form': form})  # فرم را به صفحه ارسال کنید
