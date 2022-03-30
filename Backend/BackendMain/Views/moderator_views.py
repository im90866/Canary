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
class GetReports(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        data = self.request.data

        FS = gridfs.GridFS(CLIENT_DATABASE)

        user_col = CLIENT_DATABASE['userInfo']
        report_col = CLIENT_DATABASE['reportData']

        reportList = []
        reportResults = report_col.find().sort('_id', -1).limit(15)
        
        for report in reportResults:
            imageID = user_col.find_one({'_id': ObjectId(report['senderID'])})['profilePictureID']

            imageString = FS.get(ObjectId(imageID))        
            imageString = resizeImage(imageString, 300)

            report['imageVal'] = imageString
            report.pop('_id', None)

            reportList.append(report)

        return Response({
            'success': 'Reports obtained',
            'reportList': reportList
        })

class ReportView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        report_col = CLIENT_DATABASE['reportData']

        senderName = user_col.find_one({'_id': ObjectId(data['senderID'])})['username']

        reportInit = {
            'senderID': data['senderID'], 
            'senderName': senderName,
            'info': data['info'],
            'type': data['type'],
        }

        if data['type'] == 'post':
            reportInit['info'] = senderName + ' has reported this post for the following: ' + reportInit['info'] 
            reportInit['onPostID'] = data['onPostID']
        elif data['type']== 'profile':
            reportInit['info'] = senderName + ' has reported this profile and has sent the following reason: ' + reportInit['info'] 
            reportInit['onProfileID'] = data['onProfileID']

        reportVal = Report(reportInit).getModel()
        report_col.insert_one(reportVal)

        return Response({
            'success': 'Report added',
        })

class GetSummary(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        user_col = CLIENT_DATABASE['userInfo']
        post_col = CLIENT_DATABASE['postData']
        proj_col = CLIENT_DATABASE['projectData']

        usersCount = user_col.count_documents({})
        postCount = post_col.count_documents({})
        projCount = proj_col.count_documents({})

        remixCount = post_col.count_documents({'remixPostID': {
            '$exists': True
        }})

        return Response({
            'success': 'Got summary report',
            'usersCount': usersCount,
            'postCount': postCount,
            'projCount': projCount,
            'remixCount': remixCount
        })

class IsAdmin(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, userID, format=None):
        user_col = CLIENT_DATABASE['userInfo']

        if 'isAdmin' in user_col.find_one({'_id': ObjectId(userID)}):
            return Response({
                'success': 'Got is admin',
                'isAdmin': True
            })
        else:
            return Response({
                'success': 'Got is admin',
                'isAdmin': False
            })



