import uuid
from django.db import models

class UUIDBinaryField(models.BinaryField):
    def from_db_value(self, value, expression, connection):
        """تبدیل باینری به UUID هنگام بازیابی از پایگاه داده"""
        if value is None:
            return value
        # بررسی طول بایت‌ها قبل از تبدیل به UUID
        if len(value) != 16:
            raise ValueError('bytes is not a 16-char string')
        return uuid.UUID(bytes=value)  # تبدیل باینری به UUID

    def get_prep_value(self, value):
        """تبدیل UUID به باینری هنگام ذخیره در پایگاه داده"""
        if isinstance(value, uuid.UUID):
            return value.bytes  # تبدیل UUID به باینری
        return value

    def to_python(self, value):
        """تبدیل داده‌های ورودی به UUID"""
        if isinstance(value, uuid.UUID):
            return value
        if value is None:
            return value
        # بررسی طول بایت‌ها قبل از تبدیل به UUID
        if len(value) != 16:
            raise ValueError('bytes is not a 16-char string')
        return uuid.UUID(bytes=value)  # تبدیل باینری به UUID
