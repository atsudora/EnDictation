# Generated by Django 4.2.1 on 2023-10-10 15:10

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_remove_dictation_sound_file_path_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dictation',
            name='rank',
            field=models.PositiveIntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(8)], verbose_name='難易度'),
        ),
    ]
