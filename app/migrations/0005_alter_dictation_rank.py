# Generated by Django 4.2.1 on 2023-05-18 03:14

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_dictation_rank'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dictation',
            name='rank',
            field=models.PositiveIntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(3)], verbose_name='難易度'),
        ),
    ]
