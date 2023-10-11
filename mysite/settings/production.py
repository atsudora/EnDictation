import os
from .base import *

DEBUG = False
ALLOWED_HOSTS = ['endictation.onrender.com', 'www.endictation.com', 'endictation.com']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.getenv('POSTGRES_DB'),
        'USER': os.getenv('POSTGRES_USER'),
        'PASSWORD': os.getenv('POSTGRES_PASSWORD'),
        'HOST': os.getenv('POSTGRES_HOST'),
        'PORT': os.getenv('POSTGRES_PORT'),
    }
}

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

# Static and media files
STATIC_ROOT = str(BASE_DIR / 'staticfiles')
MEDIA_ROOT = str(BASE_DIR / 'media')

# Rest of your production settings...
DEFAULT_FILE_STORAGE = os.getenv('DEFAULT_FILE_STORAGE')
AWS_ACCESS_KEY_ID = os.getenv('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = os.getenv('AWS_STORAGE_BUCKET_NAME')
AWS_S3_REGION_NAME = os.getenv('AWS_S3_REGION_NAME')

RANDUM_SENTENCE_URL_API = os.getenv("RANDUM_SENTENCE_URL_API")
