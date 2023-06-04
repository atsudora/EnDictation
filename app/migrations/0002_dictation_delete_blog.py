# Generated by Django 4.2.1 on 2023-05-18 03:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Dictation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sentence', models.TextField(default=0, verbose_name='内容')),
                ('sound_file_path', models.TextField(default=0, verbose_name='音声ファイルのパス')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='作成日')),
            ],
            options={
                'verbose_name': 'ディクテーション',
                'verbose_name_plural': 'ディクテーション',
            },
        ),
        migrations.DeleteModel(
            name='Blog',
        ),
    ]
