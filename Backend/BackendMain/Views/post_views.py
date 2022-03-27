from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect

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
class LikePost(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        post_col = CLIENT_DATABASE['postData']

        postVal = post_col.find_one({'_id': ObjectId(data['postID'])})

        # For notification check
        check = False
        for memberID in postVal['memberList']:
            if data['userID'] == memberID['id']:
                check = True

        likeChange = 1
        if data['userID'] in postVal['likedBy']:
            likeChange = -1

        post_col.update_one({
            '_id' : ObjectId(data['postID'])
        }, {
            '$inc' : {
                'likes' : likeChange
            }
        })

        if likeChange == 1:
            post_col.update_one({
                '_id' : ObjectId(data['postID'])
            }, {
                '$push' : {
                    'likedBy' : data['userID']
                }
            })
        else:
            post_col.update_one({
                '_id' : ObjectId(data['postID'])
            }, {
                '$pull' : {
                    'likedBy' : data['userID']
                }
            })

        # Send notification to everyone in memberList
        if not check:
            if likeChange == 1:
                for memberID in postVal['memberList']:
                    user_col.update_one({
                        '_id': ObjectId(memberID['id'])
                    }, {
                        '$push': {
                            'notificationList': {
                                '$each': [Notification({
                                    'userID': data['userID'],
                                    'type':  'like',
                                    'postID': data['postID']
                                }).getModel()],
                                '$position': 0
                            }
                        }
                    })
                    
            elif likeChange == -1:
                for memberID in postVal['memberList']:
                    user_col.update_one({
                        '_id': ObjectId(memberID['id'])
                    }, {
                        '$pull': {
                            'notificationList': {
                                '$and': [
                                    {
                                        'type': {
                                            '$eq': 'like'
                                        }
                                    },
                                    {   
                                        'onPostID': {
                                            '$eq': data['postID']
                                        }
                                    }
                                ]
                            }
                        }
                    })

        return Response({
            'success': 'Home feed posts recieved',
            'likes' : (post_col.find_one({'_id': ObjectId(data['postID'])}))['likes'],
        })

class LikeStatus(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        post_col = CLIENT_DATABASE['postData']

        likedBy = post_col.find_one({'_id': ObjectId(data['postID'])})['likedBy']

        if data['userID'] in likedBy:
            return Response({
                'success': 'Got like status',
                'liked' : True,
            })
        else:
            return Response({
                'success': 'Got like status',
                'liked' : False,
            })


class CommentPost(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        post_col = CLIENT_DATABASE['postData']

        postVal = post_col.find_one({'_id': ObjectId(data['postID'])})

        # For notification check
        check = False
        for memberID in postVal['memberList']:
            if data['userID'] == memberID['id']:
                check = True

        commentVal = comment(data['userID'], data['postID'], data['info']).getModel()

        post_col.update_one({
            '_id' : ObjectId(data['postID'])
        }, {
            '$push' : {
                'comments' : {
                    '$each': [commentVal],
                }
            }
        })

        if not check:
            for member in postVal['memberList']:
                user_col.update_one({
                    '_id': ObjectId(member['id'])
                }, {
                    '$push': {
                        'notificationList': {
                            '$each': [Notification({
                                'userID': data['userID'],
                                'type': 'comment',
                                'info': data['info'],
                                'postID': data['postID']
                            }).getModel()],
                            '$position': 0
                        }
                    }
                })
            
        return Response({
            'success': 'Comment posted',
            'createdAt': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
            
class GetPost(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, postID, userID, format=None):
        user_col = CLIENT_DATABASE['userInfo']
        post_col = CLIENT_DATABASE['postData']
        meta_col = CLIENT_DATABASE['imageData']

        FS = gridfs.GridFS(CLIENT_DATABASE)

        postVal = post_col.find_one({'_id': ObjectId(postID)})
        imageString = FS.get(meta_col.find_one({'_id': ObjectId(postVal['metadataID'])})['imageID'])

        updatedUpload = str(datetime.now() - datetime.strptime(postVal['uploadTime'], '%Y-%m-%d %H:%M:%S'))

        memberList =[]
        for id in postVal['memberList']:
            memberVal = user_col.find_one({'_id': ObjectId(id['id'])})

            imageVal = FS.get(ObjectId(memberVal['profilePictureID']))
            imageVal = resizeImage(imageVal, 300)

            memberList.append({
                'username': memberVal['username'],
                'profilePicture': imageVal
            })
        
        commentList = []
        for comment in postVal['comments']:
            userVal = user_col.find_one({'_id': ObjectId(comment['userID'])})
            
            username = userVal['username']
            imageValue = FS.get(ObjectId(userVal['profilePictureID']))  
            imageValue = resizeImage(imageValue, 300)

            commentList.append({
                'username': username,
                'profilePicture': imageValue,
                'info': comment['info'],
                'createdAt': comment['createdAt']
            })

        postData = {
            'postID' : json.loads(json_util.dumps(postVal['_id']))['$oid'],
            'imageVal' : imageString,
            "memberList" : memberList,
            "uploadTime" : updatedUpload,
            "caption" : postVal['caption'],
            "likedBy" : postVal['likedBy'],
            "likes" : postVal['likes'],
            "comments" : commentList,
        }

        if 'remixPostID' in postVal:
            postData['remixPostID'] = postVal['remixPostID']

        return Response({
            'success': 'Post obtained',
            'postData' : postData
        })

# Requires userID, postID
class RemixPost(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        FS = gridfs.GridFS(CLIENT_DATABASE)

        user_col = CLIENT_DATABASE['userInfo']
        proj_col = CLIENT_DATABASE['projectData']
        meta_col = CLIENT_DATABASE['imageData']
        post_col = CLIENT_DATABASE['postData']
        folder_col = CLIENT_DATABASE['folder']

        # Creates the project name
        userVal = user_col.find_one({'_id': ObjectId(data['userID'])})
        remixCount = 1
        if 'remixCount' not in userVal:
            user_col.update_one({
                '_id': ObjectId(data['userID'])
            }, {
                '$set': {
                    'remixCount': 2
                }
            })
        else:
            remixCount = userVal['remixCount']
            user_col.update_one({
                '_id': ObjectId(data['userID'])
            }, {
                '$inc': {
                    'remixCount': 1
                }
            })

        username = userVal['username']

        # Add new project to user, labelled remix and add reference to original post
        rootFolderID = folder_col.insert_one(folder("&root&", username + '\'s Remix #' + str(remixCount)).getModel()).inserted_id
        rootFolderID = json.loads(json_util.dumps(rootFolderID))['$oid']

        projectModel = project(username + '\'s Remix #' + str(remixCount), data['userID'], username, rootFolderID).getModel()
        projectModel['isRemix'] = True
        projectModel['originalPost'] = data['postID']
        
        # Stores the project, gets the ID and appends it to the user
        projectID = (proj_col.insert_one(projectModel)).inserted_id
        projectID = json.loads(json_util.dumps(projectID))['$oid']

        # Add post image to project
        metadataID = post_col.find_one({'_id': ObjectId(data['postID'])})['metadataID']
        
        metaVal = meta_col.find_one({'_id': ObjectId(metadataID)})
        metaVal['projectID'] = projectID
        metaVal.pop('_id', None)

        newMetavalID = (meta_col.insert_one(metaVal)).inserted_id
        newMetavalID = json.loads(json_util.dumps(newMetavalID))['$oid']

        folder_col.update_one({
            '_id': ObjectId(rootFolderID)
        }, {
            '$set' : {
                'imageList' : [newMetavalID]
            }
        })

        user_col.update_one({
            '_id': ObjectId(data['userID'])
        }, {
            '$push': {
                'projectID': {
                    '$each': [projectID],
                    '$position': 0
                }
            }
        })

        return Response({ 
            'success': 'Remix project Added',
            'projectID': projectID
        })
        
        # NOT HERE 
        # but when posting image from remix project, add this post to remix list of original post and vice