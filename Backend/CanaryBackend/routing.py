from django.urls import re_path

from BackendMain.chatConsumers import *

websocket_urlpatterns = [
    re_path('ws/', ChatConsumer.as_asgi()),
]