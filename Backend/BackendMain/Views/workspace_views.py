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

    def post(self, request, format=None):
        data = self.request.data

        meta_col = CLIENT_DATABASE['imageData']
        proj_col = CLIENT_DATABASE['projectData']
        user_col = CLIENT_DATABASE['userInfo']
        folder_col = CLIENT_DATABASE['folder']

        # authorList = data['authorList']

        FS = gridfs.GridFS(CLIENT_DATABASE)

        # Stores image in the gridFS database
        imageID = FS.put(data['imageString'], encoding='utf-8')
        data['imageID'] = imageID

        # Stores the projectImage metadata 
        projectImageModel = projectImage(data)

        projectImageID = (meta_col.insert_one(projectImageModel.getModel())).inserted_id
        projectImageID = json.loads(json_util.dumps(projectImageID))['$oid']

        if 'projectID' in data:
            proj= (proj_col.find_one({'_id' : ObjectId(data['projectID'])}))
            root = folder_col.find_one({'_id' : ObjectId(proj['projectRoot'])})

            targetFolder = ""

            if len(data['currentPath']) == 1 :
                targetFolder = root
            else:
                targetFolder = searchFoldersWithPath(root, data['currentPath'], folder_col)

            newImageList = [projectImageID] + targetFolder['imageList']

            folder_col.update_one(targetFolder, {
                '$set' : {
                    'imageList' : newImageList
                }
            })

            #image = FS.get(imageID)
        #except:
        #    print("shit happened")
        #    return Response({ 'Error' : 'Something went wrong'})

        return Response({ 
            'success' : 'Image properly stored',
            'imageID' : projectImageID
        })


# To get a specific folder
class GetFolder(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, projectID, folderPath, format=None):
        data = self.request.data

        meta_col = CLIENT_DATABASE['imageData']
        proj_col = CLIENT_DATABASE['projectData']
        folder_col = CLIENT_DATABASE['folder']

        FS = gridfs.GridFS(CLIENT_DATABASE)

        root = (proj_col.find_one({'_id' : ObjectId(projectID)}))['projectRoot']
        root = folder_col.find_one({'_id' : ObjectId(root)})

        targetFolder = ""

        if len(folderPath) == 1 or folderPath == 'root':
            targetFolder = root
        else:
            targetFolder = searchFoldersWithPath(root, folderPath.split('&'), folder_col)

        finalFolderList = []
        finalImageList = []


        if targetFolder != {}:
            fList = targetFolder['folderList'] 

            for x in fList:
                resultFolder = folder_col.find_one({'_id' : ObjectId(x)})

                finalFolderList.append({
                    'folderName' : resultFolder['folderName'],
                    'folderID' : x
                })

            imageList = targetFolder['imageList'] 

            
            for x in imageList:
                metaval = meta_col.find_one({'_id': ObjectId(x)})
                metavalID = json.loads(json_util.dumps(metaval['_id']))['$oid']

                # Decode from bytes
                imageVal = FS.get(metaval['imageID'])
                imageVal = resizeImage(imageVal, 400)      # Custom function

                metaval = {
                    'projectID' : metaval['projectID'],
                    'imageID': metavalID,
                    'imageVal' : imageVal,

                    'uploadedTime' : metaval['uploadedTime'],
                    'uploader' : metaval['uploader'],
                    
                    'fileType' : metaval['fileType'],
                    'fileName' : metaval['fileName'],
                    'fileSize' : metaval['fileSize'],
                }
                finalImageList.append(metaval)
        return Response({ 
            'success' : 'Successfully obtained folders',
            'folderList' : finalFolderList,
            'imageList' : finalImageList
        })

class GetImage(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, metaID, format=None):
        data = self.request.data

        FS = gridfs.GridFS(CLIENT_DATABASE)

        meta_col = CLIENT_DATABASE['imageData']

        imageID = meta_col.find_one({'_id': ObjectId(metaID)})['imageID']
        imageVal = FS.get(ObjectId(imageID))

        return Response({
            'success': 'Obtained image',
            'imageVal': imageVal
        })


# Requires: new folder name, projectID, curFolder path
class CreateFolder(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        proj_col = CLIENT_DATABASE['projectData']
        folder_col = CLIENT_DATABASE['folder']

        proj= (proj_col.find_one({'_id' : ObjectId(data['projectID'])}))
        root = folder_col.find_one({'_id' : ObjectId(proj['projectRoot'])})

        path = data['currentFolderPath']
        targetFolder = ""

        if len(path) == 1:
            targetFolder = root
        else:
            targetFolder = searchFoldersWithPath(root, path, folder_col)

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
            'folderID': folderID
        })

class RenameFolder(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        proj_col = CLIENT_DATABASE['projectData']
        folder_col = CLIENT_DATABASE['folder']

        folder_col.update_one({
            '_id': ObjectId(data['folderID'])
        }, {
            '$set': {
                'folderName': data['newName']
            }
        })

        return Response({
            'success': 'Successfully changed name of folder'
        })

class DeleteFolder(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        folder_col = CLIENT_DATABASE['folder']
        proj_col = CLIENT_DATABASE['projectData']

        proj = (proj_col.find_one({'_id' : ObjectId(data['projectID'])}))
        root = folder_col.find_one({'_id' : ObjectId(proj['projectRoot'])})

        path = data['folderPath']
        targetFolder = ""

        if len(path) == 1:
            targetFolder = root
        else:
            targetFolder = searchFoldersWithPath(root, path, folder_col)

        folder_col.update_one(targetFolder, {
            '$pull': {
                'folderList': data['folderID']
            }
        })

        recursiveDelete(data['folderID'], folder_col)

        return Response({
            'success': 'Successfully deleted folder'
        })

def recursiveDelete(folderID, col):
    folderVal = col.find_one({'_id': ObjectId(folderID)})

    folderList = folderVal['folderList']

    col.delete_one({'_id': ObjectId(folderID)})  
    
    for x in folderList:
        recursiveDelete(x, col)


class GetProjectDetails(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

# requires projectID, imageID, person uploading, caption
class PostImage(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        
        user_col = CLIENT_DATABASE['userInfo']
        post_col = CLIENT_DATABASE['postData']
        proj_col = CLIENT_DATABASE['projectData']

        if 'projectID' in data:
            projectVal = proj_col.find_one({'_id': ObjectId(data['projectID'])})
            
            newPost = post(data, projectVal['projectMembers']).getModel()
            if 'isRemix' in projectVal:
                newPost['remixPostID'] = projectVal['originalPost']

            postID = post_col.insert_one(newPost).inserted_id
            postID = json.loads(json_util.dumps(postID))['$oid']
            
            for x in projectVal['projectMembers']:
                userVal = user_col.find_one({'_id': ObjectId(x['id'])}) # SUBJECT TO CHANGE - CHANGE TO ALL USERS INSTEAD OF JUST ADMIN
                newPostVal = [postID] + userVal['postID'] 

                user_col.update_one(userVal, {
                    '$set' : {
                        'postID' : newPostVal
                    }
                })

            return Response({ 
                'success': 'Post added',
            })
        else:

            username = user_col.find_one({'_id': ObjectId(data['userID'])})['username']
            newPost = post(data, [{'id': data['userID'], 'username': username}]).getModel()

            postID = post_col.insert_one(newPost).inserted_id
            postID = json.loads(json_util.dumps(postID))['$oid']

            user_col.update_one({
                '_id': ObjectId(data['userID'])
            }, {
                '$push' : {
                    'postID' : {
                        '$each': [postID],
                        '$position': 0
                    }
                }
            })
            
            return Response({ 
                'success': 'Post added',
            })

        """
        for x in projectVal['projectMembers']:
            user_col.find_one({ObjectId(x)})
        """

class RenameImage(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        proj_col = CLIENT_DATABASE['projectData']
        meta_col = CLIENT_DATABASE['imageData']

        meta_col.update_one({
            '_id': ObjectId(data['imageID'])
        }, {
            '$set': {
                'fileName': data['newName']
            }
        })

        return Response({
            'success': 'Successfully changed name of Image'
        })

class DeleteImage(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        folder_col = CLIENT_DATABASE['folder']
        proj_col = CLIENT_DATABASE['projectData']

        proj = (proj_col.find_one({'_id' : ObjectId(data['projectID'])}))
        root = folder_col.find_one({'_id' : ObjectId(proj['projectRoot'])})

        path = data['folderPath']
        targetFolder = ""

        if len(path) == 1:
            targetFolder = root
        else:
            targetFolder = searchFoldersWithPath(root, path, folder_col)

        folder_col.update_one(targetFolder, {
            '$pull': {
                'imageList': data['imageID']
            }
        })

        return Response({ 
            'success': 'Post deleted',
        })



class CreateSpecImage(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        meta_col = CLIENT_DATABASE['imageData']
        FS = gridfs.GridFS(CLIENT_DATABASE)

        imageID = FS.put(data['imageString'], encoding='utf-8')

        data['imageID'] = imageID

        model = {
            'imageID' : imageID,
            'fileName' : 'profilePicture',
        }
        
        meta_col.insert_one(model)

def searchFoldersWithPath(root, folderPath, col):
    folderPath.pop(0)

    curFolder = root['folderList']

    if not len(curFolder) > 0:
        return {}
    else:
        while len(folderPath) > 0:
            for x in curFolder:
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
        

