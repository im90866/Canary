import json

from channels.generic.websocket import AsyncWebsocketConsumer
from matplotlib.pyplot import text
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
        chatList = []

        for x in self.scope['headers']:
            if x[0] == b'cookie':
                text = x[1].decode('utf-8')
                text = (re.search('userID.*', text).group(0)).replace("userID=", "")
                
                self.userID = text

                chatList = await self.getChats(text)
                

        # Join all chatID groups
        for room in chatList:
            await self.channel_layer.group_add(
                room,
                self.channel_name
            )

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
        text_data_json = json.loads(text_data)
        layer = get_channel_layer()

        if 'connect_to_chat' in text_data_json:
            chatID_list = await self.getChats(text_data_json['userID'])

            for x in chatID_list:
                await layer.group_add(
                    x,
                    self.channel_name
                )
        elif 'send_to_chat' in text_data_json:
            print(text_data_json)
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

    

