from django.db import models
from django.core import validators

## 
class Dictation(models.Model):
  english_sentence = models.TextField(
    '英文',
    blank=False,
    null=False,
    default='English Sentence')
  japanese_sentence = models.TextField(
    '日本語訳',
    blank=False,
    null=False,
    default='日本語訳',)
  rank = models.PositiveIntegerField(
    '難易度',
    blank=False,
    null=False,
    default=0,
    validators=[validators.MinValueValidator(0),validators.MaxValueValidator(3)])
  audio_file = models.FileField(
    '音声ファイル',
    upload_to='audio_files/',
    default='')
  updated_at = models.DateTimeField('更新日', auto_now=True)
  created_at = models.DateTimeField('作成日', auto_now_add=True)
  
  class Meta:
    verbose_name = 'ディクテーション'
    verbose_name_plural = 'ディクテーション'
  
  def __str__(self):
    return self.english_sentence