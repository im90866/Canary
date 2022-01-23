from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect

from .helper_functions import *

import hashlib

# Variables
CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

# Views
"""
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

    return HttpResponse(s)
"""

class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    @csrf_exempt
    def post(self, request, format=None):
        data = self.request.data
        
        collection = CLIENT_DATABASE['userInfo']

        username = data['username']
        password = data['password']
        re_password  = data['re_password']

        try:
            if password == re_password:
                if ifExists(username, "username"):
                    return Response({ 'error': 'Username already exists' })
                else:
                    if len(password) < 6:
                        return Response({ 'error': 'Password must be at least 6 characters' })
                    else:
                        password = hashlib.sha256(request['password'].encode())

                        user_info = {
                            'username' : username,
                            'password' : password,
                        }

                        collection.insert_one(user_info)

                        return Response({ 'success': 'User created successfully' })
            else:
                return Response({ 'error': 'Passwords do not match' })
        except:
                return Response({ 'error': 'Something went wrong when registering account' })


class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    @csrf_exempt
    def post(self, request, format=None):
        print('s')
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            collection = CLIENT_DATABASE['userInfo']

            password = hashlib.sha256(password.encode()).hexdigest()
            valid = False

            for x in collection.find():
                if x['username'] == username:
                    if x['password'] == password:
                        valid = True      

            if valid:
                return Response({ 'success': 'User authenticated' })
            else:
                return Response({ 'error': 'Error Authenticating' })
        except:
            return Response({ 'error': 'Something went wrong when logging in' })