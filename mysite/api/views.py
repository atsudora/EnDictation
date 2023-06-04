from rest_framework.generics import ListAPIView, RetrieveAPIView, GenericAPIView
from rest_framework.response import Response
from django.db.models import QuerySet
from mysite.api.serializers import DictationSerializer
from app.models import Dictation

# 全データ一覧
class DictationAllListView(ListAPIView):
  queryset = Dictation.objects.order_by('-created_at')
  serializer_class = DictationSerializer

# 詳細
class DictationDetailView(RetrieveAPIView):
  queryset = Dictation.objects.all()
  serializer_class = DictationSerializer

## ランダム
class DictationRandView(GenericAPIView):
  queryset = Dictation.objects.all()
  serializer_class = DictationSerializer
  
  def get(self, request, *args, **kwargs):
    queryset = self.get_queryset().order_by('?').first()
    serializer = self.get_serializer(queryset)
    # print("Queryset: ", queryset)  # Debug line
    # serializer = self.get_serializer(queryset, many=True)
    # print("Serialized data: ", serializer.data)  # Debug line
    return Response(serializer.data)