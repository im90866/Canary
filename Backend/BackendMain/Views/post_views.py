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
class LikePost(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        post_col = CLIENT_DATABASE['postData']

        postVal = post_col.find_one({'_id': ObjectId(data['postID'])})

        # For notification check
        check = False
        for memberID in postVal['memberList']:
            if data['userID'] == memberID['id']:
                check = True

        likeChange = 1
        if data['userID'] in postVal['likedBy']:
            likeChange = -1

        post_col.update_one({
            '_id' : ObjectId(data['postID'])
        }, {
            '$inc' : {
                'likes' : likeChange
            }
        })

        if likeChange == 1:
            post_col.update_one({
                '_id' : ObjectId(data['postID'])
            }, {
                '$push' : {
                    'likedBy' : data['userID']
                }
            })
        else:
            post_col.update_one({
                '_id' : ObjectId(data['postID'])
            }, {
                '$pull' : {
                    'likedBy' : data['userID']
                }
            })

        # Send notification to everyone in memberList
        if not check:
            if likeChange == 1:
                for memberID in postVal['memberList']:
                    user_col.update_one({
                        '_id': ObjectId(memberID['id'])
                    }, {
                        '$push': {
                            'notificationList': {
                                '$each': [Notification({
                                    'userID': data['userID'],
                                    'type':  'like',
                                    'postID': data['postID']
                                }).getModel()],
                                '$position': 0
                            }
                        }
                    })
                    
            elif likeChange == -1:
                for memberID in postVal['memberList']:
                    user_col.update_one({
                        '_id': ObjectId(memberID['id'])
                    }, {
                        '$pull': {
                            'notificationList': {
                                '$and': [
                                    {
                                        'type': {
                                            '$eq': 'like'
                                        }
                                    },
                                    {   
                                        'onPostID': {
                                            '$eq': data['postID']
                                        }
                                    }
                                ]
                            }
                        }
                    })

        return Response({
            'success': 'Home feed posts recieved',
            'likes' : (post_col.find_one({'_id': ObjectId(data['postID'])}))['likes'],
        })

class CommentPost(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        post_col = CLIENT_DATABASE['postData']

        postVal = post_col.find_one({'_id': ObjectId(data['postID'])})

        # For notification check
        check = False
        for memberID in postVal['memberList']:
            if data['userID'] == memberID['id']:
                check = True

        commentVal = comment(data['userID'], data['postID'], data['info']).getModel()

        post_col.update_one({
            '_id' : ObjectId(data['postID'])
        }, {
            '$push' : {
                'comments' : {
                    '$each': [commentVal],
                }
            }
        })

        if not check:
            for member in postVal['memberList']:
                user_col.update_one({
                    '_id': ObjectId(member['id'])
                }, {
                    '$push': {
                        'notificationList': {
                            '$each': [Notification({
                                'userID': data['userID'],
                                'type': 'comment',
                                'info': data['info'],
                                'postID': data['postID']
                            }).getModel()],
                            '$position': 0
                        }
                    }
                })
            
        return Response({
            'success': 'Comment posted',
            'createdAt': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
            
class GetPost(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, postID, userID, format=None):
        user_col = CLIENT_DATABASE['userInfo']
        post_col = CLIENT_DATABASE['postData']
        meta_col = CLIENT_DATABASE['imageData']

        FS = gridfs.GridFS(CLIENT_DATABASE)

        postVal = post_col.find_one({'_id': ObjectId(postID)})
        imageString = FS.get(meta_col.find_one({'_id': ObjectId(postVal['metadataID'])})['imageID'])

        updatedUpload = str(datetime.now() - datetime.strptime(postVal['uploadTime'], '%Y-%m-%d %H:%M:%S'))

        memberList =[]
        for id in postVal['memberList']:
            memberVal = user_col.find_one({'_id': ObjectId(id['id'])})

            imageVal = FS.get(ObjectId(memberVal['profilePictureID']))
            imageVal = resizeImage(imageVal, 300)

            memberList.append({
                'username': memberVal['username'],
                'profilePicture': imageVal
            })
        
        commentList = []
        for comment in postVal['comments']:
            userVal = user_col.find_one({'_id': ObjectId(comment['userID'])})
            
            username = userVal['username']
            imageValue = FS.get(ObjectId(userVal['profilePictureID']))  
            imageValue = resizeImage(imageValue, 300)

            commentList.append({
                'username': username,
                'profilePicture': imageValue,
                'info': comment['info'],
                'createdAt': comment['createdAt']
            })


        postData = {
            'postID' : json.loads(json_util.dumps(postVal['_id']))['$oid'],
            'imageVal' : imageString,
            "memberList" : memberList,
            "uploadTime" : updatedUpload,
            "caption" : postVal['caption'],
            "likedBy" : postVal['likedBy'],
            "likes" : postVal['likes'],
            "comments" : commentList,
        }

        return Response({
            'success': 'Post obtained',
            'postData' : postData
        })

class RemixPost(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        # Add new project to user, labelled remix and add reference to original post
        # Add post image to project
        
        # NOT HERE 
        # but when posting image from remix project, add this post to remix list of original post and vice