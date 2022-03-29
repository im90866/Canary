import json

from channels.generic.websocket import AsyncWebsocketConsumer
# from matplotlib.pyplot import text
from channels.layers import get_channel_layer

from .helper_functions import *
from .custom_models import *

import re

CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'chat'

        self.userID = ""
        userID = ""
        chatList = []

        for x in self.scope['headers']:
            if x[0] == b'cookie':
                text = x[1].decode('utf-8')
                try:
                    text = (re.search('userID.*;', text).group(0))
                    text = text.replace(";", "")
                except:
                    text = (re.search('userID.*', text).group(0))

                text = text.replace("userID=", "")
                
                self.userID = str(text)
                userID = str(text)
                
        # Join your own userID group
        try:
            await self.channel_layer.group_add(
                    userID,
                    self.channel_name
            )
        except:
            print("Does not go through")

        await self.accept()

    async def disconnect(self, close_code):
        print('disconnected')

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        layer = get_channel_layer()

        if 'send_to_chat' in text_data_json:
            await layer.group_send(
                    text_data_json['userID'],
                    {
                        'type': 'chat.message',
                        'userID': text_data_json['userID'],
                        'otherID': text_data_json['otherID'],
                        'username': text_data_json['username'],
                        'message': text_data_json['message'],
                        'chatID': text_data_json['chatID']
                    }
                )

            await layer.group_send(
                    text_data_json['otherID'],
                    {
                        'type': 'chat.message',
                        'userID': text_data_json['userID'],
                        'otherID': text_data_json['otherID'],
                        'username': text_data_json['username'],
                        'message': text_data_json['message'],
                        'chatID': text_data_json['chatID']
                    }
                )

    async def chat_message(self, data):
        print('yas', data)
        await self.send(json.dumps({
            'messageBy': data['username'],
            'messageVal': data['message'],
            'chatID': data['chatID']
        }))



        """
        await self.send(text_data=json.dumps({
            'message': message+message+message
        }))
        """


    async def getChats(self, userID):
        user_col = CLIENT_DATABASE['userInfo']

        chatList = user_col.find_one({'_id': ObjectId(userID)})['chatList']

        finalChatList = []

        for x in chatList:
            finalChatList.append(x['chatID'])
        
        return finalChatList


class GroupChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'chat'

        self.userID = ""

        for x in self.scope['headers']:
            if x[0] == b'cookie':
                text = x[1].decode('utf-8')
                print(text)
                try:
                    text = (re.search('userID.*;', text).group(0))
                    text = text.replace(";", "")
                except:
                    text = (re.search('userID.*', text).group(0))

                text = text.replace("userID=", "")
                self.userID = text

        # Join your own userID group
        await self.channel_layer.group_add(
                self.userID,
                self.channel_name
        )

        print('connected')
        await self.accept()

    async def disconnect(self, close_code):
        print('disconnected')

    async def receive(self, text_data):
        proj_col = CLIENT_DATABASE['projectData']

        text_data_json = json.loads(text_data)
        layer = get_channel_layer()

        if 'send_to_group_chat' in text_data_json:
            projectMembers = proj_col.find_one({'_id': ObjectId(text_data_json['projectID'])})['projectMembers']

            for member in projectMembers:
                await layer.group_send(
                        member['id'],
                        {
                            'type': 'group_chat_message',
                            'userID': text_data_json['userID'],
                            'username': text_data_json['username'],
                            'message': text_data_json['message'],
                            'chatID': text_data_json['chatID']
                        }
                    )

    async def group_chat_message(self, data):
        print('yas', data)
        await self.send(json.dumps({
            'messageBy': data['username'],
            'messageVal': data['message'],
            'chatID': data['chatID']
        }))

