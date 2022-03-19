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

    def get(self, request, userID, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']

        userData = user_col.find_one({'_id': ObjectId(userID)})

        newUserData = {}

        newUserData['success'] = "Successfully obtained data"
        newUserData['username'] = userData['username']
        newUserData['fullname'] = userData['fullname']
        newUserData['DOB'] = userData['DOB']
        newUserData['email'] = userData['email']

        return(Response(newUserData))

class UsernameExistCheck(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, username, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']

class EmailExistCheck(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, username, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']


class UploadUserInfo(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']

        if 'fullname' in data:
            user_col.update_one({
                '_id': data['userID']
            }, {
                '$set': {
                    'fullname': data['fullname']
                }
            })
        
        if 'DOB' in data:
            user_col.update_one({
                '_id': ObjectId(data['userID'])
            }, {
                '$set': {
                    'DOB' : data['DOB']
                }
            })

        return Response({
            'success': 'Values successfully changed'
        })

class ChangeProfilePicture(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        FS = gridfs.GridFS(CLIENT_DATABASE)

        user_col = CLIENT_DATABASE['userInfo']

        oldImageID = user_col.find_one({'_id': ObjectId(data['userID'])})['profilePictureID']

        imageID = FS.put(data['imageString'], encoding='utf-8')
        if(str(oldImageID) != '6228f291957de3501a1e7fd7'):
            FS.delete(ObjectId(oldImageID))

        user_col.update_one({
            '_id': ObjectId(data['userID'])
        }, {
            '$set': {
                'profilePictureID': imageID
            }
        })

        return Response({
            'success': 'Profile picture changed'
        })

class SendEmail(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        send_mail(
            'Here\'s your email man',
            'Here\'s the actual content of the email, my guy',
            'madebyteamcanary@gmail.com',
            ['cameraupten@gmail.com'],
            fail_silently=False,
        )

        return Response({
            'yes':'yes'
        })

