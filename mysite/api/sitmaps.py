from django.contrib.sitemaps import Sitemap
from django.urls import reverse

from .models import Article  # サイトマップ作成に使用するモデル名


class ArticleSitemap(Sitemap):
    def items(self):
        return Article.objects.all()

    def location(self, item):
        return reverse("bbs:detail", args=[item.id])
