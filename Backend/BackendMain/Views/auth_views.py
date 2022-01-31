from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect

from .helper_functions import *
from .custom_models import *

# Variables
CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

# Views
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )

    @csrf_exempt
    def post(self, request, format=None):
        data = self.request.data
        
        collection = CLIENT_DATABASE['userInfo']

        username = data['username']
        password = data['password']
        userDetails = data['userDetails']

        try:
            if ifExists(username, "username"):
                return Response({ 'error': 'Username already exists' })
            else:
                userModel = userInfo(username, password, userDetails)
                user_info = userModel.getModel()

                collection.insert_one(user_info)
                return Response({ 'success': 'User created successfully' })
        except:
                return Response({ 'error': 'Something went wrong when registering account' })


class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    @csrf_exempt
    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        collection = CLIENT_DATABASE['userInfo']
        
        password = hashlib.sha256(password.encode()).hexdigest()
        valid = False
        
        query = {
            'username' : username
        }

        for x in collection.find(query):
            if x['password'] == password:
                    valid = True    
                  
        if valid:
            return Response({ 'success': 'User authenticated' })
        else:
            return Response({ 'error': 'Error Authenticating' })
