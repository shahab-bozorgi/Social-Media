from io import BytesIO
from django.core.files.base import ContentFile
from celery import shared_task, chain, group, chord
import requests
import os
from PIL import Image
from django.conf import settings

from accounts.models import ImageRecord


@shared_task
def download_image(image_url):
    filename = os.path.join(settings.MEDIA_ROOT, os.path.basename(image_url))

    os.makedirs(os.path.dirname(filename), exist_ok=True)

    response = requests.get(image_url, stream=True)

    if response.status_code == 200:
        with open(filename, 'wb') as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)
        return filename
    else:
        raise Exception(f"Failed to download image: status {response.status_code}")

@shared_task
def compress_image(path):
    img = Image.open(path)
    img.save(path, optimize=True, quality=50)
    return path

@shared_task
def save_image_record(path):
    obj = ImageRecord.objects.create(file_path=path)
    return obj.id

# @shared_task
# def compress_image(post_image_id):
#     # بازیابی تصویر از دیتابیس
#     from posts.models import PostImage
#     post_image = PostImage.objects.get(id=post_image_id)
#     image = Image.open(post_image.image)
#
#     # تغییر ابعاد تصویر (اگر ابعاد بزرگ باشد)
#     max_width = 800
#     max_height = 800
#     image.thumbnail((max_width, max_height))  # تغییر ابعاد تصویر
#
#     # تنظیمات کاهش اندازه تصویر
#     image = image.convert("RGB")
#     output = BytesIO()
#     image.save(output, format='JPEG', quality=50)  # کاهش کیفیت تصویر
#
#     output.seek(0)
#
#     # ایجاد یک فایل جدید برای تصویر فشرده‌شده
#     file_name = f"compressed_{post_image.image.name.split('/')[-1]}"  # انتخاب نام فایل جدید
#     content_file = ContentFile(output.read(), name=file_name)
#
#     # ذخیره فایل فشرده‌شده
#     post_image.image.save(file_name, content_file, save=True)  # تصویر فشرده‌شده ذخیره می‌شود
#
#     return file_name
#
