from tokenize import String
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect

from PIL import Image # import pillow library (can install with "pip install pillow")


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
class GetProfilePicture(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, userID, format=None):
        FS = gridfs.GridFS(CLIENT_DATABASE)
        
        user_col = CLIENT_DATABASE['userInfo']
    
        imageID = user_col.find_one({'_id': ObjectId(userID)})['profilePictureID']
        
        imageString = FS.get(ObjectId(imageID))        
        imageString = resizeImage(imageString, 300)

        return Response({
            'success': 'Obtained image',
            'imageString': imageString,
        })

class GetFollowers(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, userID, format=None):
        FS = gridfs.GridFS(CLIENT_DATABASE)

        user_col = CLIENT_DATABASE['userInfo']

        followCount = len(user_col.find_one({'_id': ObjectId(userID)})['followedBy'])

        return Response({
            'success': 'Obtained follower count',
            'followCount': followCount,
        })

class GetProfileFeed(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, userID, format=None):
        FS = gridfs.GridFS(CLIENT_DATABASE)

        user_col = CLIENT_DATABASE['userInfo']
        post_col = CLIENT_DATABASE['postData']
        meta_col = CLIENT_DATABASE['imageData']
    
        postList = user_col.find_one({'_id': ObjectId(userID)})['postID']

        imageList = []

        for postID in postList:
            print(postID)
            postData = post_col.find_one({'_id': ObjectId(postID)})
            metaID = postData['metadataID']
            imageID = meta_col.find_one({'_id': ObjectId(metaID)})['imageID']
            
            imageVal = FS.get(ObjectId(imageID))

            memberList =[]
            for id in postData['memberList']:
                memberList.append(user_col.find_one({'_id': ObjectId(id['id'])})['username'])

            upadatedUpload = str(datetime.now() - datetime.strptime(postData['uploadTime'], '%Y-%m-%d %H:%M:%S'))

            newPostData = {
                'postID' : json.loads(json_util.dumps(postData['_id']))['$oid'],
                'imageVal' : imageVal,
                "memberList" : memberList,
                "uploadTime" : upadatedUpload,
                "caption" : postData['caption'],
                "likedBy" : postData['likedBy'],
                "likes" : postData['likes'],
                "comments" : postData['comments'],
            }
            imageList.append(newPostData)


        return Response({
            'success': 'Obtained image',
            'postData': imageList
        })

class IsBlocked(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']

        userVal = user_col.find_one({'_id': ObjectId(data['userID'])})

        if data['otherUserID'] in userVal['blockedList']:
            return Response({
                'success': 'Got information',
                'blocked': True
            })
        else:
            return Response({
                'success': 'Got information',
                'blocked': False
            })

class BlockUser(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        post_col = CLIENT_DATABASE['postData']

        userVal = user_col.find_one({'_id': ObjectId(data['userID'])})

        if data['otherUserID'] not in userVal['blockedList']:
            user_col.update_one({
                '_id': ObjectId(data['userID'])
            }, {
                '$push': {
                    'blockedList': data['otherUserID']
                }
            })

            user_col.update_one({
                '_id': ObjectId(data['otherUserID'])
            }, {
                '$push': {
                    'blockedByList': data['otherUserID']
                }
            })

            return Response({
                'success': 'Blocked user',
            })
        else:
            user_col.update_one({
                '_id': ObjectId(data['userID'])
            }, {
                '$pull': {
                    'blockedList': data['otherUserID']
                }
            })

            user_col.update_one({
                '_id': ObjectId(data['otherUserID'])
            }, {
                '$pull': {
                    'blockedByList': data['otherUserID']
                }
            })

            return Response({
                'success': 'Unblocked user',
            })

class IsFollowing(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']

        userVal = user_col.find_one({'_id': ObjectId(data['userID'])})

        if data['otherUserID'] in userVal['following']:
            return Response({
                'success': 'Got information',
                'following': True
            })
        else:
            return Response({
                'success': 'Got information',
                'blocked': False
            })

class FollowUser(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
    
        user_col = CLIENT_DATABASE['userInfo']

        userVal = user_col.find_one({'_id': ObjectId(data['userID'])})

        if data['otherUserID'] not in userVal['following']:
            user_col.update_one({
                '_id': ObjectId(data['userID'])
            }, {
                '$push': {
                    'following': data['otherUserID']
                }
            })

            user_col.update_one({
                '_id': ObjectId(data['otherUserID'])
            }, {
                '$push': {
                    'followedBy': data['userID']
                }
            })
            return Response({
                'success': 'Followed user',
                'follow': True
            })
        else:
            user_col.update_one({
                '_id': ObjectId(data['userID'])
            }, {
                '$pull': {
                    'following': data['otherUserID']
                }
            })

            user_col.update_one({
                '_id': ObjectId(data['otherUserID'])
            }, {
                '$pull': {
                    'followedBy': data['userID']
                }
            })

            return Response({
                'success': 'Unfollowed user',
                'follow': False
            })

        

