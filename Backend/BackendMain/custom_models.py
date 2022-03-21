from email import message
from .helper_functions import *

import hashlib
from datetime import datetime
from bson import json_util, ObjectId

CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

class userInfo():
    _username = ""
    _password = ""
    _fullname = ""
    _email = ""
    _profilePictureID = ObjectId("6228f291957de3501a1e7fd7")
    _userDetails = {}
    _postID = []
    _projectID = []
    _notificationList = []

    _chatList = []
    _userSettings = {}
    _DOB = ""

    # Creates a model with default features
    def __init__(self, username, password, email):
        self.setAuth(username, password)
        self._fullname = username
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
            "fullname": self._fullname,
            "profilePictureID": self._profilePictureID,
            "email" : self._email,
            "userDetails": self._userDetails,
            "postID" : self._postID,
            "projectID" : self._projectID,
            "chatList": self._chatList,
            "notificationList": self._notificationList,
            "userSettings" : self._userSettings,
            "DOB": self._DOB
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
    _projectAdminID = ""
    _projectMembers = []
    _projectRoot = ""
    _projectSettings = {}

    def __init__(self, name, adminID, username, root):
        self._projectName = name
        self._projectAdminID = adminID
        self._projectMembers = [{'id': adminID, 'username': username}]
        self._projectRoot = root

    def otherInit(self, jsonFile):
        self._projectName = jsonFile['projectName']
        self._projectAdminID = jsonFile['projectAdminID']
        self._projectMembers = jsonFile['projectMembers']
        self._projecRoot = jsonFile['projectRoot']
        self._projectSettings = jsonFile['projectSettings']

    def addFolder(self, newImage):
        newList = self._projectRoot[:].append(newImage)
        return newList

    def getModel(self):
        model = {
            'projectName' : self._projectName,
            'projectAdminID' : self._projectAdminID,
            'projectMembers' : self._projectMembers,
            'projectRoot' : self._projectRoot,
            'projectSettings' : self._projectSettings
        }

        return model

class post():
    _fromProjectID = ""
    _metadataID = ""
    _memberList = []
    _uploadTime = ""
    _caption = ""
    _likes = 0
    _likedBy = []
    _comments = []
    _engagement = 0

    def __init__(self, jsonFile, memberList):
        self._fromProjectID = jsonFile['projectID']
        self._metadataID = jsonFile['metadataID']
        self._memberList = memberList
        self._uploadTime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        self._caption = jsonFile['caption']

    def getModel(self):
        model = {
            'projectID' : self._fromProjectID,
            'metadataID' : self._metadataID,
            "memberList" : self._memberList,
            "uploadTime" : self._uploadTime,
            "caption" : self._caption,
            "likedBy" : self._likedBy,
            "likes" : self._likes,
            "comments" : self._comments,
            "engagement" : self._engagement,
        }

        return model

class ChatStore():
    _otherPersonsID = ""
    _chatID = ""
    _show = True

    def __init__(self, otherPersonsID, chatID):
        self._otherPersonID = otherPersonsID
        self._chatID = chatID

    def getModel(self):
        model = {
            'otherPersonsID' : self._otherPersonID,
            'chatID' : self._chatID,
        }

        return model

class chat():
    _createdAt = ""
    _lastModified = ""
    _messageList = []
    _personAID = ""
    _personBID = ""

    def __init__(self, idA, idB):
        time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        self._createdAt = time
        self._lastModified = time
        self._personAID = idA
        self._personBID =idB

    def getModel(self):
        model = {
            'createdAt' : self._createdAt,
            'lastModified' : self._lastModified,
            'messageList' : self._messageList,
        }

        return model


class Message():
    _chatId = ""
    _info = ""
    _createdAt = ""
    _createdBy = ""

    def __init__(self, chatID, info, by):
        self._chatID = chatID
        self._info = info
        self._createdBy = by
        self._createdAt = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    def getModel(self):
        model = {
            'chatID' : self._chatID,
            'messageVal' : self._info, 
            'messageBy' : self._createdBy,
            'createdAt' : self._createdAt,
        }

        return model

class Notification():
    _senderID = ""
    _type = ""
    _info = ""
    _onPostID = ""
    _createdAt = ""

    def __init__(self, info, by):
        self._info = info
        self._createdBy = by

    def getModel(self):
        model = {
            'messageVal' : self._info, 
            'messageBy' : self._createdBy
        }

        return model

class ProjectInvite():
    _senderID = ""
    _projectID = ""
    _info = ""
    _onPostID = ""
    _createdAt = ""