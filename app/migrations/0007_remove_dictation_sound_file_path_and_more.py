# Generated by Django 4.2.1 on 2023-05-20 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_remove_dictation_sentence_dictation_english_sentence_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='dictation',
            name='sound_file_path',
        ),
        migrations.AddField(
            model_name='dictation',
            name='audio_file',
            field=models.FileField(default='', upload_to='audio_files/', verbose_name='音声ファイル'),
        ),
    ]
