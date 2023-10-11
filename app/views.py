from django.shortcuts import render
from django.views.generic import TemplateView
from django.conf import settings

class IndexView(TemplateView):
  template_name = 'app/index.html'
  
class RandomView(TemplateView):
  template_name = 'app/random.html'
  
  def get_context_data(self, **kwargs):
    context = super().get_context_data(**kwargs)
    context['RANDUM_SENTENCE_URL_API'] = settings.RANDUM_SENTENCE_URL_API
    return context