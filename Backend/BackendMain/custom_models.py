import hashlib

class userInfo():
    _username = ""
    _password = ""
    _email = ""
    _profilePictureID = ""
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
    _uploadedTime = ""
    _uploader = ""
    _authorList = []
    _fileType = ""
    _dimensons = {
        "height" : 0, 
        "width" : 0
    }

    def __init__(self, jsonFile): 
        self._imageID = jsonFile['imageID']
        self._projectID = jsonFile['projectID']
        self._uploadedTime = jsonFile['uploadedTime']
        self._uploader = jsonFile['uploader']
        self._fileType = jsonFile['fileType']
        self._dimensons = {
            "height" : jsonFile['dimensions']['height'], 
            "width" : jsonFile['dimensions']['width']
        }
    
    def getModel(self):
        model = {
            'imageID' : self._imageID,
            'projectID' : self._projectID,
            'uploadedTime' : self._uploadedTime,
            'uploader' : self._uploader,
            'fileType' : self._fileType,
            'dimensions' : self._dimensons 
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

class postImage():
    _fromProjectID = ""
    _imageID = ""
    _projectMembers = []
    _fileType = ""
    _dimensons = {
        'height' : 0,
        'width' : 0,
    }
    _caption = ""
    _likes = 0
    _comments = []
    _engagement = 0

    def __init__(self, projID, jsonfile):
        pass

    def __init__(self, jsonFile):
        self._fromProjectID = jsonFile['fromProjectID']
        self._imageID = jsonFile['imageID']
        self._fileType = jsonFile['fileType']
        self._dimensons = jsonFile['dimension']
        self._caption = jsonFile['caption']
        self._likes = jsonFile['likes']
        self._comments = jsonFile['comments']
        self._engagement = jsonFile['engagement']

    def getModel(self):
        model = {
            'imageID' : self._imageID,
            'projectMembers' : self._projectMembers,
            'fileType' : self._fileType,
            'dimensons' : self._dimensons,
            "caption" : self._caption,
            "likes" : self._likes,
            "comments" : self._comments,
            "engagement" : self._engagement,
        }

        return model
