from tokenize import String
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect

import json
import re
import gridfs
from bson import json_util, ObjectId
from datetime import datetime

from ..helper_functions import *
from ..custom_models import *

# Variables
CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

class ChangeProfilePicture(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        FS = gridfs.GridFS(CLIENT_DATABASE)

        user_col = CLIENT_DATABASE['userInfo']

        oldImageID = user_col.find_one({'username': data['username']})['profilePictureID']

        imageID = FS.put(data['imageString'], encoding='utf-8')
        FS.delete(ObjectId(oldImageID))

        user_col.update_one({
            'username': data['username']
        }, {
            '$set': {
                'profilePictureID': imageID
            }
        })

        return Response({
            'success': 'Profile picture changed'
        })

class GetProfilePicture(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, username, format=None):
        FS = gridfs.GridFS(CLIENT_DATABASE)

        user_col = CLIENT_DATABASE['userInfo']
    
        imageID = user_col.find_one({'username': username})['profilePictureID']
        imageString = FS.get(ObjectId(imageID))

        return Response({
            'success': 'Obtained image',
            'imageString': imageString,
        })
