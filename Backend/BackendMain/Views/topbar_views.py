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

# Views
class GetUsername(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, userID, format=None):
        user_col = CLIENT_DATABASE['userInfo']

        username = user_col.find_one({'_id': ObjectId(userID)})['username']

        print(username)

        return Response({
            'success': 'Obtained username',
            'username': username,
        })

class GetUserID(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, username, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        
        userID = user_col.find_one({'username': username})['_id']
        userID = json.loads(json_util.dumps(userID))['$oid']

        print(userID)

        return Response({
            'success': 'Obtained username',
            'userID': userID,
        })

class GetNotifications(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, userID, format=None):
        user_col = CLIENT_DATABASE['userInfo']

        notificationList = user_col.find_one({'_id': ObjectId(userID)})['notificationList']

        notifList = []
        inviteList = []

        for val in notificationList:
            info = ""
            if val['type'] == 'like':
                info = val['senderName'] + " has liked your post"
                val['info'] = info
                notifList.append(val)
            elif val['type'] == 'comment':
                info = val['senderName'] + " has commented on your post"
                val['info'] = info
                notifList.append(val)
            elif val['type'] == 'invite':
                info = val['senderName'] + " has requested you to join their project: " + val['projectName']
                val['info'] = info
                inviteList.append(val)

        print(notifList)
        print(inviteList)

        return Response({
            'success': 'Notifications succesfully recieved',
            'notificationsList' : notifList,
            'inviteList': inviteList
        })
        