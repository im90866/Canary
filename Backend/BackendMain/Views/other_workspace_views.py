from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect

import re
import json
import base64
from bson import json_util, ObjectId

from ..helper_functions import *
from ..custom_models import *

import gridfs

# Variables
CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

# Views
# Requires recieverID, projectID
class SendRequest(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        proj_col = CLIENT_DATABASE['projectData']

        projVal = proj_col.find_one({'_id': ObjectId(data['projectID'])})

        if data['otherUserID'] not in projVal['inviteList']:
            proj_col.update_one({
                '_id': ObjectId(data['projectID'])
            }, {
                '$push': {
                    'inviteList': {
                        '$each': [data['otherUserID']],
                        '$position': 0
                    }
                }
            })

            projName = projVal['projectName']

            user_col.update_one({
                '_id': ObjectId(data['otherUserID'])
            }, {
                '$push': {
                    'requestList': {
                        '$each': [Notification({
                            'userID': data['userID'],
                            'type': 'invite',
                            'projectID': data['projectID'],
                            'projectName': projName
                        }).getModel()],
                        '$position': 0
                    }
                }
            })

        return Response({
                'success': 'Invite successfully sent',
        })

# Accepts or denies a request
class InteractRequest(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        proj_col = CLIENT_DATABASE['projectData']

        username = user_col.find_one({'_id': ObjectId(data['userID'])})['username']

        print(data['userID'] + " " + data['projectID'])

        # Remove user from project's invite list
        proj_col.update_one({
            '_id': ObjectId(data['projectID'])
        }, {
            '$pull': {
                'inviteList': {
                    '$in': [data['userID']]
                }
            }
        })

        # If accepted, then add user to the project's member list and add the project to that user's list
        if data['interact'] == 'accept':
            proj_col.update_one({
                '_id': ObjectId(data['projectID'])
            }, {
                '$push': {
                    'projectMembers': {
                        'id': data['userID'],
                        'username': username
                    }
                }
            })

            user_col.update_one({
                '_id': ObjectId(data['userID'])
            }, {
                '$push': {
                    'otherProjectID': {
                        '$each': [data['projectID']],
                        '$position': 0
                    }
                }
            })

        # Remove notification
        user_col.update_one({
            '_id': ObjectId(data['userID'])
        }, {
            '$pull': {
                'requestList': {
                    '$and': [
                        {
                            'type': {
                                '$eq': 'invite'
                            }
                        },
                        {   
                            'projectID': {
                                '$eq': data['projectID']
                            }
                        }
                    ]
                }
            }
        })

        return Response({
                'success': 'Successfully interacted with request',
        })

class RemoveUser(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        proj_col = CLIENT_DATABASE['projectData']

        username = user_col.find_one({'_id': ObjectId(data['userID'])})['username']

        proj_col.update_one({
            '_id': ObjectId(data['projectID'])
        }, {
            '$pull': {
                'projectMembers': {
                    'id': data['userID'],
                    'username': username
                }
            }
        })

        user_col.update_one({
            '_id': ObjectId(data['userID'])
        }, {
            '$pull': {
                'otherProjectID': data['projectID'],
            }
        })

        return Response({
                'success': 'Successfully removed user',
        })



class GetProjectMembers(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, projectID, format=None):
        proj_col = CLIENT_DATABASE['projectData']

        projectVal = proj_col.find_one({'_id': ObjectId(projectID)})
        memberVal = projectVal['projectMembers']

        memberList = []
        for member in memberVal:
            memberList.append({
                'id': member['id'],
                'username': member['username']
            })

        print(memberList)
        return Response({
                'success': 'Obtained project members',
                'memberList': memberList,
                'adminID': projectVal['projectAdminID']
        })

class SearchProfilesInvite(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, value, projectID, format=None):
        data = self.request.data
        FS = gridfs.GridFS(CLIENT_DATABASE)

        user_col = CLIENT_DATABASE['userInfo']
        proj_col = CLIENT_DATABASE['projectData']

        projectVal = proj_col.find_one({'_id': ObjectId(projectID)})
        memberVal = projectVal['projectMembers']

        query = str(value) + '.*'

        regx = re.compile(query, re.IGNORECASE)
        query = user_col.find({"username": regx})
        query_results = []

        counter = 0
        for x in query:
            if counter > 10:
                break
            
            
            newUserID = json.loads(json_util.dumps(x['_id']))['$oid']

            check = False
            for member in memberVal:
                if newUserID in member['id']:
                    check = True
                    break
            
            if check:
                continue
            
            print(newUserID)
            print(memberVal)
            print("")
            
            userDict = {
                'userID': newUserID,
                'username': x['username'],
                'profilePictureID': FS.get(x['profilePictureID'])
            }
            query_results.append(userDict)

            counter += 1

        return Response({
            'success': 'Results found',
            'results' : query_results
        })