# Generated by Django 5.1.1 on 2024-11-04 20:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_alter_profile_user'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Profile',
        ),
    ]
