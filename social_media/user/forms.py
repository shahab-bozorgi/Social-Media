from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from user.models import CustomUser


class LoginForm(forms.Form):
    username = forms.CharField(
        max_length=50,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'id': 'username',
            'placeholder': 'Username'
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'id': 'password',
            'placeholder': 'Password'
        })
    )


class RegistrationForm(forms.Form):
    full_name = forms.CharField(
        label="First & Last Name",
        max_length=100,
        widget=forms.TextInput(attrs={'required': 'required',
                                      'placeholder': 'Full Name'})
    )
    username = forms.CharField(
        label="User Name",
        max_length=150,
        widget=forms.TextInput(attrs={'required': 'required',
                                      'placeholder': 'Username'})
    )
    password = forms.CharField(
        label="Password",
        widget=forms.PasswordInput(attrs={'required': 'required',
                                          'placeholder': 'Password'})
    )
    password_confirm = forms.CharField(
        label="Password Confirm",
        widget=forms.PasswordInput(attrs={'required': 'required',
                                          'class': 'form-group d-flex',
                                          'placeholder': 'Password Confirm'})
    )
    email = forms.EmailField(
        label="Email",
        widget=forms.EmailInput(attrs={'required': 'required',
                                       'placeholder': 'Email'})
    )



class CustomUserCreationForm(forms.ModelForm):
    password = forms.CharField(label='Password', widget=forms.PasswordInput)
    password_confirm = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'fullname', 'bio', 'avatar')

    def clean_password_confirm(self):
        password = self.cleaned_data.get("password")
        password_confirm = self.cleaned_data.get("password_confirm")
        if password and password_confirm and password != password_confirm:
            raise forms.ValidationError("Passwords don't match")
        return password_confirm

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user

class CustomUserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'fullname', 'bio', 'avatar', 'is_active', 'is_staff')

