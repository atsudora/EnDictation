from rest_framework import serializers
from app.models import Dictation

class DictationSerializer(serializers.ModelSerializer):
  audio_file = serializers.SerializerMethodField()
  
  class Meta:
    model = Dictation
    fields = '__all__'
  
  def get_audio_file(self, obj):
    if obj.audio_file and hasattr(obj.audio_file, 'url'):
      request = self.context.get('request')
      # ファイルのフルURLを生成します。
      audio_file_url = request.build_absolute_uri(obj.audio_file.url)
      return audio_file_url
    else:
        return None