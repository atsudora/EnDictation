import os
from pathlib import Path
from decouple import Csv
import logging
from logging.handlers import TimedRotatingFileHandler

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'app',
    'corsheaders',
    'django.contrib.sites', # サイト管理用ツール
    'django.contrib.sitemaps',  # サイトマップ作成用ツール
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'mysite.urls'

# Tepmpateフォルダへの絶対パスを定義
TEMPLATE_DIR = BASE_DIR / "Template"

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATE_DIR,],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'mysite.wsgi.application'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'ja'
TIME_ZONE = 'Asia/Tokyo'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_DIR = BASE_DIR / "static"
STATICFILES_DIRS = [STATIC_DIR,]

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

REST_FRAMEWORK = {
    'DATETIME_FORMAT': '%Y/%m/%d %H%M',
}

CORS_ORIGIN_ALLOW_ALL = True

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
        'info_filter': {
            '()': 'django.utils.log.CallbackFilter',
            'callback': lambda record: record.levelno == logging.INFO,
        },
        'warning_filter': {
            '()': 'django.utils.log.CallbackFilter',
            'callback': lambda record: record.levelno == logging.WARNING,
        },
        'error_filter': {
            '()': 'django.utils.log.CallbackFilter',
            'callback': lambda record: record.levelno == logging.ERROR,
        },
    },
    'formatters': {
        'standard': {
            'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'standard',
            'level': 'DEBUG',
        },
        'info_file_handler': {
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs/info.log'),
            'when': 'midnight',
            'backupCount': 30,
            'formatter': 'standard',
            'level': 'INFO',
            'filters': ['info_filter'],
        },
        'warning_file_handler': {
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs/warning.log'),
            'when': 'midnight',
            'backupCount': 30,
            'formatter': 'standard',
            'level': 'WARNING',
            'filters': ['warning_filter'],
        },
        'error_file_handler': {
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs/error.log'),
            'when': 'midnight',
            'backupCount': 30,
            'formatter': 'standard',
            'level': 'ERROR',
            'filters': ['error_filter'],
        },
    },
    'root': {
        'handlers': ['console', 'info_file_handler', 'warning_file_handler', 'error_file_handler'],
        'level': 'DEBUG',
    },
}

# siteフレームワーク
SITE_ID = 1