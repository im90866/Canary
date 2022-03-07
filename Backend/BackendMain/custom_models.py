from .helper_functions import *

import hashlib
from datetime import datetime

CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

class userInfo():
    _username = ""
    _password = ""
    _email = ""
    _profilePictureID = "6224c0913f4d78e52661d872"
    _userDetails = {}
    _postID = []
    _projectID = []
    _userSettings = {}

    # Creates a model with default features
    def __init__(self, username, password, email):
        self.setAuth(username, password)
        self._email = email

    # Creates model without checks. Use when JSON object is taken from database
    @classmethod
    def otherInit(self, jsonFile):
        self.setAuth(jsonFile['username'], jsonFile['password'])
        self._profilePictureID = jsonFile['profilePictureID']
        self._userDetails = jsonFile['userDetails']
        self._postID = jsonFile['postID']
        self._projectID = jsonFile['projectID']
        self._userSettings = jsonFile['userSettings']

    def setAuth(self, username, password):
        self._username = username
        self._password = hashlib.sha256(password.encode()).hexdigest()

    def addPost(self, postID):
        self._postID.append(postID)

    def addProject(self, newProj):
        newList = self._projectID[:].append(newProj)
        return newList

    def removeProject(self, newProj):
        newList = self._projectID[:].remove(newProj)
        return newList

    def getModel(self):
        model = {
            "username" : self._username,
            "password" : self._password,
            "profilePictureID": self._profilePictureID,
            "email" : self._email,
            "userDetails": self._userDetails,
            "postID" : self._postID,
            "projectID" : self._projectID,
            "userSettings" : self._userSettings
        }

        return model

class folder():
    _projectID = ""
    _projectName = ""
    _folderName = ""
    _parentID = ""
    _folderList = []    
    _imageList = []

    def __init__(self, name, projectName): 
        self._folderName = name
        self._projectName = projectName

    def getModel(self):
        model = {
            "type" : 'folder',
            "projectName" : self._projectName,
            "folderName" : self._folderName,
            "parentID" : self._parentID,
            "folderList" : self._folderList,
            "imageList" : self._imageList
        }

        return model
    

class projectImage():
    _imageID = ""
    _projectID = ""
    _imageName = ""
    _uploadedTime = ""
    _uploader = ""
    _authorList = []
    _fileSize = 0
    _fileType = ""

    def __init__(self, jsonFile): 
        self._imageID = jsonFile['imageID']
        self._projectID = jsonFile['projectID']
        self._imageName = jsonFile['fileName']
        self._uploadedTime = jsonFile['uploadedTime']
        self._uploader = jsonFile['uploader']
        self._fileSize = jsonFile['fileSize']
        self._fileType = jsonFile['fileType']
    
    def getModel(self):
        model = {
            'imageID' : self._imageID,
            'projectID' : self._projectID,
            'fileName' : self._imageName,
            'uploadedTime' : self._uploadedTime,
            'uploader' : self._uploader,
            'fileSize' : self._fileSize,
            'fileType' : self._fileType,
        }

        return model
    

class project():
    _projectName = ""
    _projectAdmin = ""
    _projectMembers = []
    _projectRoot = ""
    _projectSettings = {}

    def __init__(self, name, admin, root):
        self._projectName = name
        self._projectAdmin = admin
        self._projectMembers = [admin]
        self._projectRoot = root

    def otherInit(self, jsonFile):
        self._projectName = jsonFile['projectName']
        self._projectAdmin = jsonFile['projectAdmin']
        self._projectMembers = jsonFile['projectMembers']
        self._projecRoot = jsonFile['projectRoot']
        self._projectSettings = jsonFile['projectSettings']

    def addFolder(self, newImage):
        newList = self._projectRoot[:].append(newImage)
        return newList

    def getModel(self):
        model = {
            'projectName' : self._projectName,
            'projectAdmin' : self._projectAdmin,
            'projectMembers' : self._projectMembers,
            'projectRoot' : self._projectRoot,
            'projectSettings' : self._projectSettings
        }

        return model

class post():
    _fromProjectID = ""
    _metadataID = ""
    _uploader = ""
    _uploadTime = ""
    _caption = ""
    _likes = 0
    _likedBy = []
    _comments = []
    _engagement = 0

    def __init__(self, jsonFile):
        self._fromProjectID = jsonFile['projectID']
        self._metadataID = jsonFile['metadataID']
        self._uploader = jsonFile['uploader']
        self._uploadTime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    def getModel(self):
        model = {
            'projectID' : self._fromProjectID,
            'metadataID' : self._metadataID,
            "uploader" : self._uploader,
            "uploadTime" : self._uploadTime,
            "caption" : self._caption,
            "likedBy" : self._likedBy,
            "likes" : self._likes,
            "comments" : self._comments,
            "engagement" : self._engagement,
        }

        return model
