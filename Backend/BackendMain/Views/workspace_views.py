from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect

import json
from bson import json_util, ObjectId

from ..helper_functions import *
from ..custom_models import *

import gridfs

# Variables
CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

# Views
class CreateImage(APIView):
    permission_classes = (permissions.AllowAny, )

    @csrf_exempt
    def post(self, request, format=None):
        data = self.request.data

        meta_col = CLIENT_DATABASE['imageData']
        proj_col = CLIENT_DATABASE['projectData']
        user_col = CLIENT_DATABASE['userInfo']
        folder_col = CLIENT_DATABASE['folder']

        # authorList = data['authorList']

        FS = gridfs.GridFS(CLIENT_DATABASE)

        try: 
            # Stores image in the gridFS database
            imageID = FS.put(data['imageString'], filename=data['filename'])
            data['imageID'] = imageID

            # Stores the projectImage metadata 
            projectImageModel = projectImage(data)

            projectImageID = (meta_col.insert_one(projectImageModel.getModel())).__inserted_id
            projectImageID = json.loads(json_util.dumps(projectImageID))['$oid']

            root = (proj_col.find_one({'_id' : ObjectId(data['projectID'])}))['projectRoot']
            targetFolder = ""

            if data['curFolder'] == '&root&':
                targetFolder = searchFolders(root, root, folder_col)
            else:
                targetFolder = searchFolders(root, data['curFolder'], folder_col)

            newImageList = [projectImageID] + targetFolder['imageList']

            folder_col.update_one(targetFolder, {
               '$set' : {
                   'imageList' : newImageList
               }
            })

            #image = FS.get(imageID)
        except:
            print("shit happened")
            return Response({ 'Error' : 'Something went wrong'})

        return Response({ 'success' : 'Image properly stored' })


# To get a specific folder
class GetFolder(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, projectID, folderPath, format=None):
        data = self.request.data

        meta_col = CLIENT_DATABASE['imageData']
        proj_col = CLIENT_DATABASE['projectData']
        folder_col = CLIENT_DATABASE['folder']

        FS = gridfs.GridFS(CLIENT_DATABASE)

        print(projectID)
        root = (proj_col.find_one({'_id' : ObjectId(projectID)}))['projectRoot']
        root = folder_col.find_one({'_id' : ObjectId(root)})

        targetFolder = ""

        if folderPath == 'root':
            targetFolder = root
        else:
            targetFolder = searchFolders(root, folderPath, folder_col)

        finalFolderList = []
        finalImageList = []

        if targetFolder != {}:
            fList = targetFolder['folderList'] 
            print(fList)

            for x in fList:
                resultFolder = folder_col.find_one({'_id' : ObjectId(x)})

                finalFolderList.append({
                    'folderName' : resultFolder['folderName'],
                    'folderID' : x
                })

            imageList = targetFolder['imageList'] 

            for x in imageList:
                metaval = meta_col.find_one({'_id': ObjectId(x)})
                metaval = {
                    'imageID' : metaval['imageID'],
                    'projectID' : metaval['projectID'],
                    'imageVal' : FS.get(metaval['imageID']),
                    'uploadedTime' : metaval['uploadedTime'],
                    'uploader' : metaval['uploader'],
                    'fileType' : metaval['fileType'],
                    'dimensions' : metaval['dimensions']
                }

                finalImageList.append(metaval)
            
        print("stuff: ", finalFolderList)
        return Response({ 
            'success' : 'Successfully obtained folders',
            'folderList' : finalFolderList,
            'imageList' : finalImageList
        })

# Requires: projectName, projectID, curFolder name
class CreateFolder(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        proj_col = CLIENT_DATABASE['projectData']
        folder_col = CLIENT_DATABASE['folder']

        proj= (proj_col.find_one({'_id' : ObjectId(data['projectID'])}))
        root = folder_col.find_one({'_id' : ObjectId(proj['projectRoot'])})

        targetFolder = ""


        if data['curFolder'] == 'root':
            targetFolder = root
        else:
            targetFolder = searchFolders(root['folderList'], data['curFolder'], folder_col)

        #error check

        folderID = folder_col.insert_one(folder(data['folderName'], proj['projectName']).getModel()).inserted_id
        folderID = json.loads(json_util.dumps(folderID))['$oid']

        newFolder = [folderID] + targetFolder['folderList']

        folder_col.update_one(targetFolder, {
            '$set' : {
                'folderList' : newFolder
            }
        })

        #except: 
        #    return Response({ 
        #        'Error' : 'Folder not added',
        #    })


        return Response({ 
            'success' : 'Folder Added',
        })

class GetProjectDetails(APIView):
    permission_classes = (permissions.AllowAny, )

    @csrf_exempt
    def post(self, request, format=None):
        data = self.request.data

class PostImage(APIView):
    permission_classes = (permissions.AllowAny, )

    @csrf_exempt
    def post(self, request, format=None):
        data = self.request.data
        projID = data['projectID']

        newPost = postImage(data)


# Function to find and return a folder
def searchFolders(curFolder, goalFolder, col):
    if not len(curFolder) > 0:
        return {}
    else:
        for x in curFolder:
            print(x)
            val = col.find_one({'_id' : ObjectId(x)})
            if val['projectName'] == goalFolder:
                return val

        totalVal = {}
        for x in curFolder:
            checkFolder = col.find_one({'_id' : ObjectId(x)})
            totalVal = dict(list(totalVal.items()) + list(searchFolders(checkFolder['folderList'], goalFolder).items()))
        return totalVal


def searchFoldersWithPath(root, folderPath, col):
    folderPath = (folderPath.split('&')).pop(0)

    curFolder = root[:]

    if not len(curFolder) > 0:
        return {}
    else:
        while len(folderPath) > 0:
            for x in curFolder:
                print(x)
                val = col.find_one({'_id' : ObjectId(x)})
                if x == folderPath[0]:
                    folderPath.pop(0)

                    if len(folderPath) > 0:
                        curFolder = val['folderList']
                    else:
                        return val
                    break
            if len(folderPath) == 0:
                return "error"
        

