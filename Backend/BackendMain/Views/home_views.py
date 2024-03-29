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
                'userID': json.loads(json_util.dumps(x['_id']))['$oid'],
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

    def get(self, request, userID, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        post_col = CLIENT_DATABASE['postData']
        meta_col = CLIENT_DATABASE['imageData']

        FS = gridfs.GridFS(CLIENT_DATABASE)

        print(userID)
        postCount = 0
        followPost = []
        following = user_col.find_one({'_id': ObjectId(userID)})['following']

        if following != None:
            for user in following:
                if postCount > 4:
                    break
                posts = user_col.find_one({'_id': ObjectId(user)})['postID']
                for post in posts:
                    if postCount > 4:
                        break
                    postVal = post_col.find_one({'_id': ObjectId(post)})
                    followPost.append(postVal)
                    postCount += 1

        discoverPosts = post_col.aggregate([{'$sample': {'size': 4}}])
        hotPosts = post_col.find().sort('likes', -1).limit(4)
        followingPosts = followPost

        discoverList = getPostData(discoverPosts)
        hotList = getPostData(hotPosts)
        followingList = getPostData(followingPosts)
        
        return Response({
            'success': 'Home feed posts recieved',
            'discoverPosts' : discoverList,
            'hotPosts': hotList,
            'followingPosts': followingList
        })

class GetCategory(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, userID, type, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        post_col = CLIENT_DATABASE['postData']
        meta_col = CLIENT_DATABASE['imageData']

        FS = gridfs.GridFS(CLIENT_DATABASE)

        postResult = []
        postCursor = []

        LIMIT = 16

        if type == 'discover': 
            postResult = post_col.aggregate([{'$sample': {'size': LIMIT}}])
        elif type == 'hot':
            postResult = post_col.find().sort('likes', -1).limit(LIMIT)
        elif type == 'following':
            postCount = 0
            following = user_col.find_one({'_id': ObjectId(userID)})['following']

            if following != None:
                for user in following:
                    if postCount > LIMIT:
                        break
                    posts = user_col.find_one({'_id': ObjectId(user)})['postID']
                    for post in posts:
                        if postCount > LIMIT:
                            break
                        postVal = post_col.find_one({'_id': ObjectId(post)})
                        postResult.append(postVal)
                        postCount += 1

        postResult = getPostData(postResult)
        return Response({
            'success': 'Category posts recieved',
            'postList' : postResult,
        })

def getPostData(postVal):
    user_col = CLIENT_DATABASE['userInfo']
    post_col = CLIENT_DATABASE['postData']
    meta_col = CLIENT_DATABASE['imageData']

    FS = gridfs.GridFS(CLIENT_DATABASE)

    postList = []

    for val in postVal:
        metaval = meta_col.find_one({'_id': ObjectId(val['metadataID'])})
        imageVal = FS.get(metaval['imageID'])

        updatedUpload = str(datetime.now() - datetime.strptime(val['uploadTime'], '%Y-%m-%d %H:%M:%S'))

        memberList =[]
        for id in val['memberList']:
            memberVal = user_col.find_one({'_id': ObjectId(id['id'])})

            imageValue = FS.get(ObjectId(memberVal['profilePictureID']))
            imageValue = resizeImage(imageValue, 300)

            memberList.append({
                'username': memberVal['username'],
                'profilePicture': imageValue
            })

        postData = {
            'postID' : json.loads(json_util.dumps(val['_id']))['$oid'],
            'imageVal' : imageVal,
            "memberList" : memberList,
            "uploadTime" : updatedUpload,
            "caption" : val['caption'],
            "likedBy" : val['likedBy'],
            "likes" : val['likes'],
            "comments" : val['comments'],
        }

        print('sent')
        postList.append(postData)
    
    return postList


class GetFeedLikes(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        post_col = CLIENT_DATABASE['postData']

        postList = []

        for postID in data['postList']:
            updatedVal = {
                'postID': postID,
                'likes': post_col.find_one({'_id': ObjectId(postID)})['likes']
            }

            postList.append(updatedVal)
        print(postList)

        return Response({
            'success': 'Post list obtained',
            'postList' : postList
        })