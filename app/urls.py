from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name= 'app'

urlpatterns = [
  path('', views.IndexView.as_view()),
  path('random/', views.RandomView.as_view(), name='random'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)