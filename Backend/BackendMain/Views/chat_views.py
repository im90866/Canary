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
class GetChats(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, userID, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        chat_col = CLIENT_DATABASE['chatData']

        returnChatList = []

        chatList = user_col.find_one({'_id': ObjectId(userID)})['chatList']

        for x in chatList:
            userVal = user_col.find_one({'_id': ObjectId(x['otherPersonsID'])})
            lastModified = chat_col.find_one({'_id': ObjectId(x['chatID'])})['lastModified']
            lastModified = datetime.strptime(lastModified, '%Y-%m-%d %H:%M:%S')

            index = 0 
            #comparisondatetime.strptime(val['uploadTime'], '%Y-%m-%d %H:%M:%S')
            if returnChatList:
                while index < len(returnChatList) and lastModified < (returnChatList[index])['sentAt']:
                    index += 1
            
            returnObject = {
                'userID': x['otherPersonsID'],
                'chatID': x['chatID'],
                'username': userVal['username'],
                'profilePicture': 'val', 
                'sentAt': lastModified,
            }

            returnChatList.insert(index, returnObject)
        print(returnChatList)
        print('sent')

        for x in returnChatList:
            x.pop('sentAt', None)

        return Response({
            'success': 'Obtained chats',
            'chatList': returnChatList
        })


class GetMessages(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, chatID, userID, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        chat_col = CLIENT_DATABASE['chatData']

        print(chatID)
        chatData = chat_col.find_one({'_id': ObjectId(chatID)})['messageList']

        for x in chatData:
            if x['messageBy'] == userID:
                x['own'] = True
            else:
                x['own '] = False
            x['messageBy'] = user_col.find_one({'_id': ObjectId(x['messageBy'])})['username']
        
        return Response({
            'success': 'messages obtained',
            'messageList': chatData
        })


# Creates a new chat object if it doesn't exist in the current user
class CheckChat(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        chat_col = CLIENT_DATABASE['chatData']

        userVal = user_col.find_one({'_id': ObjectId(data['userID'])})['chatList']

        check = False
        for x in userVal:
            check = check or (data['otherPersonsID'] == x['otherPersonsID'])

        if not check:
            chatID = chat_col.insert_one(chat(data['userID'], data['otherPersonsID']).getModel()).inserted_id
            chatID = json.loads(json_util.dumps(chatID))['$oid']

            chatModel = ChatStore(data['otherPersonsID'], chatID).getModel()

            user_col.update_one({
                '_id': ObjectId(data['userID'])
            }, {
                '$push': {
                    'chatList': {
                        '$each': [chatModel],
                        '$position': 0
                    }
                }
            })

            return Response({
                'success': 'Created new chat',
                'chatID': chatID,
                'otherPersonID': data['otherPersonsID']
            })

        return Response({
            'exists' : 'already exists'
        })


# Requires messageData, chatID, otherPersonID, userID
class SendMessage(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        chat_col = CLIENT_DATABASE['chatData']

        otherUserVal = user_col.find_one({'_id': ObjectId(data['otherPersonsID'])})['chatList']

        check = False
        for x in otherUserVal:
            check = check or (data['userID'] == x['otherPersonsID'])
        
        if not check:
            chatModel = ChatStore(data['userID'], data['chatID']).getModel()

            user_col.update_one({
                '_id': ObjectId(data['otherPersonsID'])
            }, {
                '$push': {
                    'chatList': {
                        '$each': [chatModel],
                        '$position': 0
                    }
                }
            })
        
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

        chat_col.update_one({
            '_id': ObjectId(data['chatID'])
        }, {
                '$set': {
                    'lastModified': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                },
        })

        return Response({
            'success': 'Sent message',
        })



