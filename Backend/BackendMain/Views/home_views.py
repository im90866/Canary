from site import USER_BASE
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

class SearchProfiles(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, value, format=None):
        data = self.request.data
        FS = gridfs.GridFS(CLIENT_DATABASE)

        user_col = CLIENT_DATABASE['userInfo']

        query = str(value) + '.*'

        regx = re.compile(query, re.IGNORECASE)
        query = user_col.find({"username": regx})
        query_results = []

        counter = 0
        for x in query:
            if counter > 10:
                break
            
            userDict = {
                'username': x['username'],
                'profilePictureID': FS.get(x['profilePictureID'])
            }
            query_results.append(userDict)

            counter += 1

        print(query_results)

        return Response({
            'success': 'Results found',
            'results' : query_results
        })

class GetHomePosts(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, username, format=None):
        data = self.request.data

        post_col = CLIENT_DATABASE['postData']
        meta_col = CLIENT_DATABASE['imageData']

        FS = gridfs.GridFS(CLIENT_DATABASE)

        allPosts = post_col.find({})
        postList = []

        for val in allPosts:
            metaval = meta_col.find_one({'_id': ObjectId(val['metadataID'])})
            imageVal = FS.get(metaval['imageID'])

            upadatedUpload = str(datetime.now() - datetime.strptime(val['uploadTime'], '%Y-%m-%d %H:%M:%S'))

            postData = {
                'postID' : json.loads(json_util.dumps(val['_id']))['$oid'],
                'projectID' : val['projectID'],
                'imageVal' : imageVal,
                "uploader" : val['uploader'],
                "uploadTime" : upadatedUpload,
                "caption" : val['caption'],
                "likedBy" : val['likedBy'],
                "likes" : val['likes'],
                "comments" : val['comments'],
                "engagement" : val['engagement'],
            }

            postList.append(postData)

        return Response({
            'success': 'Home feed posts recieved',
            'posts' : postList,
        })

class LikePost(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        print("accessed")
        data = self.request.data

        post_col = CLIENT_DATABASE['postData']

        post_col.update_one({
            '_id' : ObjectId(data['postID'])
        }, {
            '$inc' : {
                'likes' : data['likeChange']
            }
        })

        if(data['likeChange'] == 1):
            post_col.update_one({
                '_id' : ObjectId(data['postID'])
            }, {
                '$push' : {
                    'likedBy' : data['username']
                }
            })
        else:
            post_col.update_one({
                '_id' : ObjectId(data['postID'])
            }, {
                '$pull' : {
                    'likedBy' : data['username']
                }
            })

        return Response({
            'success': 'Home feed posts recieved',
            'likes' : (post_col.find_one({'_id': ObjectId(data['postID'])}))['likes'],
        })