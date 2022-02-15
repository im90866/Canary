from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect

from ..helper_functions import *
from ..custom_models import *

import gridfs

# Variables
CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

# Views
class StoreImage(APIView):
    permission_classes = (permissions.AllowAny, )

    @csrf_exempt
    def post(self, request, format=None):
        data = self.request.data

        meta_col = CLIENT_DATABASE['projectImage']
        proj_col = CLIENT_DATABASE['projectImage']
        user_col = CLIENT_DATABASE['userInfo']

        authorList = data['authorList']

        FS = gridfs.GridFS(CLIENT_DATABASE)

        try: 
            # Stores image in the gridFS database
            imageID = FS.put(data['imageString'])
            data['imageID'] = imageID

            # Stores the projectImage metadata 
            projectImageModel = projectImage(data)
            projectImageID = meta_col.insert_one(projectImageModel.getModel())

            # Adds the ID of the new projectImage to the current project in the database
            projectData = proj_col.find_one(projectImageModel._projectID)
            newProjectList = projectData['projectImages'].append(projectImageID)

            proj_col.update_one(projectData, {
               '$set' : {
                   'projectImages' : newProjectList
               }
            })

            #image = FS.get(imageID)
        except:
            return Response({ 'Error' : 'Something went wrong'})

        return Response({ 'success' : 'Image properly stored' })

class GetProjectDetails(APIView):
    permission_classes = (permissions.AllowAny, )

    @csrf_exempt
    def post(self, request, format=None):
        data = self.request.data

class postImage(APIView):
    permission_classes = (permissions.AllowAny, )

    @csrf_exempt
    def post(self, request, format=None):
        data = self.request.data
        projID = data['projectID']

        newPost = postImage(data)