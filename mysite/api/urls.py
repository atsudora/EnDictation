from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
  path('dictation/', views.DictationAllListView.as_view()),
  path('dictation/random/', views.DictationRandView.as_view()),
  path('dictation/<str:pk>/', views.DictationDetailView.as_view()),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)