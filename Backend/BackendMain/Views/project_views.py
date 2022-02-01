from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect

import json
from bson import json_util
from .helper_functions import *
from .custom_models import *

# Variables
CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

# Views
class CreateProject(APIView):
    permission_classes = (permissions.AllowAny, )

    @csrf_exempt
    def post(self, request, format=None):
        data = self.request.data

        proj_col = CLIENT_DATABASE['projectData']
        user_col = CLIENT_DATABASE['userInfo']

        print('sssssssssssssssssssssssssss')
        print(data['projectName'] + ' ' + data['projectAdmin'])

        #if ifExistsExtra(data['projectName'], 'projectName', data['projectAdmin'], 'projectAdmin', 'projectData'):
        #    return Response({ 'error': 'You have another project with the same name' })

        projectModel = project(data['projectName'], data['projectAdmin'])
        
        projectID = (proj_col.insert_one(projectModel.getModel())).inserted_id
        projectID = json.loads(json_util.dumps(projectID))['$oid']

        userData = user_col.find_one({'username' : data['projectAdmin']})
        userProjects = userData['projectID']
        
        newProjectList = [projectID] + userProjects
        print(newProjectList)

        user_col.update_one(userData, {
            '$set' : {
                'projectID' : newProjectList
            }
        })

        print('yay')
        return Response({ 'success': 'Project Added' })

class DeleteProject(APIView):
    permission_classes = (permissions.AllowAny, )

    @csrf_exempt
    def post(self, request, format=None):
        data = self.request.data

        proj_col = CLIENT_DATABASE['projectData']
        user_col = CLIENT_DATABASE['userInfo']

        userList = data['projectMembers']

        try:
            proj_col.delete_one(data['projectID'])

            for username in userList:
                user = user_col.find(username)
                newProjectList = user['projectID'].remove(data['projectID'])
                user_col.update_one(user, {
                    '$set' : {
                        'projectID' : newProjectList
                    }
                })
        except:
            return Response({ 'error': 'Something went wrong' })
            
        return Response({ 'success': 'Project Deleted' })


class UpdateProjectName(APIView):
    permission_classes = (permissions.AllowAny, )

    @csrf_exempt
    def post(self, request, format=None):
        data = self.request.data

        proj_col = CLIENT_DATABASE['projectData']

        try:
            userProject = proj_col.find_one(data['projectID'])
            proj_col.update_one(userProject, {
                '$set' : {
                            'projectName' : data['newProjectName']
                        }
            })
        except:
            return Response({ 'error': 'Something went wrong' })
        
        return Response({ 'success': 'Project Updated' })

class GetProjects(APIView):
    permission_classes = (permissions.AllowAny, )
    @csrf_exempt
    def get(self, request, username, format=None):
        proj_col = CLIENT_DATABASE['projectData']
        user_col = CLIENT_DATABASE['userInfo']

        userProjects = (user_col.find_one({'username' : username}))['projectID']
        finalList = []

        for projID in userProjects:
            finalList.append(proj_col.find_one(projID))

        return Response({ 
            'success': 'Projects obtained',
            'projectList': finalList
        })



