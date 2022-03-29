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

        userVal = user_col.find_one({'_id': ObjectId(userID)})
        username = userVal['username']
        followedBy = len(userVal['followedBy'])

        print(username)

        return Response({
            'success': 'Obtained username',
            'username': username,
            'followers': followedBy
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

        FS = gridfs.GridFS(CLIENT_DATABASE)

        userVal = user_col.find_one({'_id': ObjectId(userID)})

        notificationList = userVal['notificationList']
        requestList = userVal['requestList']

        notifList = []
        inviteList = []

        for val in notificationList:
            info = ""
            if val['type'] == 'like':
                imageID = user_col.find_one({'_id': ObjectId(val['senderID'])})['profilePictureID']

                imageString = FS.get(ObjectId(imageID))        
                imageString = resizeImage(imageString, 300)

                val['imageVal'] = imageString

                info = val['senderName'] + " has liked your post"
                val['info'] = info

                notifList.append(val)
            elif val['type'] == 'comment':
                imageID = user_col.find_one({'_id': ObjectId(val['senderID'])})['profilePictureID']

                imageString = FS.get(ObjectId(imageID))        
                imageString = resizeImage(imageString, 300)

                val['imageVal'] = imageString

                info = val['senderName'] + " has commented on your post"
                val['info'] = info

                notifList.append(val)

        for val in requestList:
            imageID = user_col.find_one({'_id': ObjectId(val['senderID'])})['profilePictureID']

            imageString = FS.get(ObjectId(imageID))        
            imageString = resizeImage(imageString, 300)

            val['imageVal'] = imageString

            info = val['senderName'] + " has requested you to join their project: " + val['projectName']
            val['info'] = info
            
            inviteList.append(val)

        isAdmin = False
        if 'isAdmin' in userVal:
            isAdmin = True

        print(userVal['username'])

        return Response({
            'success': 'Notifications succesfully recieved',
            'notificationsList' : notifList,
            'inviteList': inviteList,
            'isAdmin': isAdmin
        })