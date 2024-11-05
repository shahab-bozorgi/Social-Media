from django import forms
from .models import CustomUser

class UpdateAvatarForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['avatar']
        widgets = {
            'avatar': forms.ClearableFileInput(attrs={
                'class': 'custom-avatar-input',
                'style': 'display: inline;'  # برای نمایش فیلد تغییر عکس
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # حذف برچسب و لینک "Currently"
        self.fields['avatar'].label = ""  # برچسب را خالی می‌کند
        self.fields['avatar'].widget.template_with_initial = ''  # حذف قسمت "Currently"
