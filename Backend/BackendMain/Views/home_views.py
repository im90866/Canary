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

        user_col = CLIENT_DATABASE['userInfo']

        query = str(value) + '.*'

        regx = re.compile(query, re.IGNORECASE)
        query_results = user_col.find({"username": regx})

        print(query_results)

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
                "likes" : val['likes'],
                "comments" : val['comments'],
                "engagement" : val['engagement'],
            }

            postList.append(postData)
            print(postList)

        return Response({
            'success': 'Home feed posts recieved',
            'posts' : postList,
        })