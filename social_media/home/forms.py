from django import forms
from user.models import CustomUser

class UpdateAvatarForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['avatar']

