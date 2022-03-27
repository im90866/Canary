from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect
from django.utils.decorators import method_decorator
from django.core.mail import send_mail

from rest_framework import filters

from ..helper_functions import *
from ..custom_models import *

import gridfs, json
from bson import json_util, ObjectId

# Variables
CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

# Views
class GetChannels(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, projectID, userID, format=None):

        user_col = CLIENT_DATABASE['userInfo']
        proj_col = CLIENT_DATABASE['projectData']
        chat_col = CLIENT_DATABASE['chatData']

        FS = gridfs.GridFS(CLIENT_DATABASE)

        userVal = user_col.find_one({'_id': ObjectId(userID)})

        ownPicture = FS.get(userVal['profilePictureID'])
        ownPicture = resizeImage(ownPicture, 300)

        channels = proj_col.find_one({'_id': ObjectId(projectID)})['projectChannels']
        print(channels)
        channelList = []

        for channel in channels:
            chatVal = chat_col.find_one({'_id': ObjectId(channel)})

            channelVal = {
                'channelID': channel,
                'channelName': chatVal['name']
            }

            channelList.append(channelVal)

        return Response({
            'success': 'Obtained channels',
            'channelList': channelList,
            'ownPicture': ownPicture
        })

class GetGroupMessages(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, chatID, userID, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        chat_col = CLIENT_DATABASE['chatData']

        FS = gridfs.GridFS(CLIENT_DATABASE)

        print(chatID)
        chatData = chat_col.find_one({'_id': ObjectId(chatID)})['messageList']

        userImageList = []

        for x in chatData:
            check = False
            for user in userImageList:
                if x['messageBy'] == user['id']:
                    check = True
 
            if not check:
                userVal = user_col.find_one({'_id': ObjectId(x['messageBy'])})
                imageVal = FS.get(ObjectId(userVal['profilePictureID']))  
                imageVal = resizeImage(imageVal, 300)

                userImageList.append({
                    'id': x['messageBy'],
                    'name': userVal['username'],
                    'imageVal': imageVal,
                })

            if x['messageBy'] == userID:
                x['own'] = True
            else:
                x['own '] = False
            x['messageBy'] = user_col.find_one({'_id': ObjectId(x['messageBy'])})['username']
        
        return Response({
            'success': 'messages obtained',
            'messageList': chatData,
            'userImageList': userImageList
        })

# Requires messageData, chatID, otherPersonID, userID
class SendGroupMessage(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        chat_col = CLIENT_DATABASE['chatData']

        messageModel = Message(data['chatID'], data['messageData'], data['userID']).getModel()

        chat_col.update_one({
            '_id': ObjectId(data['chatID'])
        }, {
                '$push': {
                    'messageList': {
                        '$each': [messageModel],
                    }
                },
        })

        return Response({
            'success': 'Sent message',
        })

class AddChannel(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        proj_col = CLIENT_DATABASE['projectData']
        chat_col = CLIENT_DATABASE['chatData']

        chatID = chat_col.insert_one(groupChat(data['channelName']).getModel()).inserted_id
        chatID = json.loads(json_util.dumps(chatID))['$oid']
        
        proj_col.update_one({
            '_id': ObjectId(data['projectID'])
        }, {
            '$push': {
                'projectChannels': {
                    '$each': [chatID],
                }
            }
        })

        channelVal = {
                'channelID': chatID,
                'channelName': data['channelName']
        }

        return Response({
                'success': 'Created new channel',
                'channelInfo': channelVal
        })

