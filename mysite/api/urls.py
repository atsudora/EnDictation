from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static
from .sitemaps import ArticleSitemap  # 先ほど作成したクラス名

sitemaps = {
    "articles": ArticleSitemap,
}

urlpatterns = [
    path("dictation/", views.DictationAllListView.as_view()),
    path("dictation/random/", views.DictationRandView.as_view()),
    path("dictation/<str:pk>/", views.DictationDetailView.as_view()),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='sitemap'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
