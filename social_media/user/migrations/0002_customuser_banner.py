# Generated by Django 5.1.1 on 2024-11-01 22:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='banner',
            field=models.ImageField(blank=True, null=True, upload_to='banner/'),
        ),
    ]
