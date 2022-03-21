from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect

import json
from bson import json_util, ObjectId

from ..helper_functions import *
from ..custom_models import *

# Variables
CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

# Views
class CreateProject(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        proj_col = CLIENT_DATABASE['projectData']
        user_col = CLIENT_DATABASE['userInfo']
        folder_col = CLIENT_DATABASE['folder']

        #if ifExistsExtra(data['projectName'], 'projectName', data['projectAdmin'], 'projectAdmin', 'projectData'):
        #    return Response({ 'error': 'You have another project with the same name' })

        # Stores the created root folder, gets the ID and appends it to the new project
        rootFolderID = folder_col.insert_one(folder("&root&", data['projectName']).getModel()).inserted_id
        rootFolderID = json.loads(json_util.dumps(rootFolderID))['$oid']

        username = user_col.find_one({'_id': ObjectId(data['projectAdminID'])})['username']
        projectModel = project(data['projectName'], data['projectAdminID'], username, rootFolderID)
        
        # Stores the project, gets the ID and appends it to the user
        projectID = (proj_col.insert_one(projectModel.getModel())).inserted_id
        projectID = json.loads(json_util.dumps(projectID))['$oid']

        userData = user_col.find_one({'_id' : ObjectId(data['projectAdminID'])})
        userProjects = userData['projectID']

        newProjectList = [projectID] + userProjects

        user_col.update_one(userData, {
            '$set' : {
                'projectID' : newProjectList
            }
        })

        return Response({ 
            'success': 'Project Added',
            'projectID': projectID
        })

class DeleteProject(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        proj_col = CLIENT_DATABASE['projectData']
        user_col = CLIENT_DATABASE['userInfo']

        userData = user_col.find_one({'_id' : ObjectId(data['projectAdminID'])})
        userData['projectID'].remove(data['projectID'])
        newProjectList = userData['projectID']

        proj_col.delete_one({'_id' : ObjectId(data['projectID'])})

        newUser = user_col.find_one({'_id' : ObjectId(data['projectAdminID'])})

        user_col.update_one(newUser, {
            '$set' : {
                'projectID' : newProjectList
            }
        })

        return Response({ 'success': 'Project Deleted' })

class UpdateProjectName(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        proj_col = CLIENT_DATABASE['projectData']

        try:
            userProject = proj_col.find_one({'_id' : ObjectId(data['projectID'])})
            proj_col.update_one(userProject, {
                '$set' : {
                            'projectName' : data['newProjectName']
                        }
            })
        except:
            return Response({ 'error': 'Something went wrong' })
        
        return Response({ 'success': 'Project Updated' })

class GetProjectName(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, projectID, format=None):
        proj_col = CLIENT_DATABASE['projectData']

        projectName = proj_col.find_one({'_id': ObjectId(projectID)})['projectName']

        return Response({ 
            'success': 'Project name obtained',
            'projectName': projectName
        })


class GetProjects(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, username, format=None):
        proj_col = CLIENT_DATABASE['projectData']
        user_col = CLIENT_DATABASE['userInfo']

        extraError = ""

        if not(ifExists(username, "username", 'userInfo')):
            raise ValueError("Wrong username sent. Something went wrong.")

        userProjects = (user_col.find_one({'username' : username}))['projectID']
        finalList = []

        for projID in userProjects:
            PROJ = proj_col.find_one({'_id' : ObjectId(projID)})
            #ID = json.loads(json_util.dumps(projID))['$oid']
            ID = projID
            struct = {
                'id' : ID,
                'projectName' : PROJ['projectName'],
            }
            
            finalList.append(struct)

        return Response({ 
            'success': 'Projects obtained',
            'projectList': finalList
        })



