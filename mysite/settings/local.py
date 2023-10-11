from .base import *
import environ

env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))  # BASE_DIR/.env

print(os.getcwd())  # 現在の作業ディレクトリを表示

DEBUG = True
ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env('DATABASE_NAME'),
        'USER': env('DATABASE_USER'),
        'PASSWORD': env('DATABASE_PASSWORD'),
        'HOST': env('DATABASE_HOST'),
        'PORT': env('DATABASE_PORT'),
    }
}

SECRET_KEY = env('SECRET_KEY')

# Static and media files
STATIC_ROOT = BASE_DIR / 'staticfiles'
MEDIA_ROOT = BASE_DIR / 'media'

# Rest of your local settings...
RANDUM_SENTENCE_URL_API = env("RANDUM_SENTENCE_URL_API")
