from django import forms

class LoginForm(forms.Form):
    username = forms.CharField(
        max_length=50,
        widget=forms.TextInput(attrs={
            'class': 'form-control',  # کلاس CSS
            'id': 'username',         # آیدی
            'placeholder': 'Username' # متنی که در ورودی نمایش داده می‌شود
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',  # کلاس CSS
            'id': 'password',         # آیدی
            'placeholder': 'Password' # متنی که در ورودی نمایش داده می‌شود
        })
    )
