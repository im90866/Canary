from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect

import json

from .helper_functions import *
from .custom_models import *

import gridfs
import hashlib

# Variables
CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

# Views
def getBack(request):
    uri = "mongodb+srv://zinasktest.uxarp.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri,
                        tls=True,
                        tlsCertificateKeyFile='Backend/BackendMain/X509-cert-7626596970333998897.pem')

    db = client['testDB']
    collection = db['testCol']

    s = ""

    for x in collection.find():
        s += str(x)

    return Response(s)

class GetProfilePosts(APIView):
    permission_classes = (permissions.AllowAny, )

    @csrf_exempt
    def post(self, request, format=None):
        data = self.request.data

def deleteAll(request):
    pass

def printAll(request):
    pass

class ReturnImage(APIView):
    permission_classes = (permissions.AllowAny, )
    
    @csrf_exempt
    def post(self, request):
        return Response({'link' : self.request.data['link']})