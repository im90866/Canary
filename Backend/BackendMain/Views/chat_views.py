from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect
from django.utils.decorators import method_decorator
from django.core.mail import send_mail

from rest_framework import filters

from ..helper_functions import *
from ..custom_models import *

import gridfs
from bson import json_util, ObjectId

# Variables
CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

# Views
class GetUserInfo(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, username, format=None):
        data = self.request.data