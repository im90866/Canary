from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect
from django.utils.decorators import method_decorator

from .helper_functions import *
from .custom_models import *

# Variables
CLIENT_SERVER = getClient()
CLIENT_DATABASE = CLIENT_SERVER['mainDB']

# Views
class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )
    something = 3

    def post(self, request, format=None):
        data = self.request.data
        
        collection = CLIENT_DATABASE['userInfo']
        
        if ifExists(data['username'], "username", 'userInfo'):
            return Response({ 'error': 'Username already exists' })
        else:
            userModel = userInfo(data['username'], data['password'], data['userDetails'])
            
            user_info = userModel.getModel()

            collection.insert_one(user_info)
            return Response({ 'success': 'User created successfully' })
    
            return Response({ 'error': 'Something went wrong when registering account' })


class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

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

        for x in collection.find():
            print(x)

        for x in collection.find(query):
            if x['password'] == password:
                    valid = True    
                  
        if valid:
            return Response({ 'success': 'User authenticated' })
        else:
            return Response({ 'error': 'Error Authenticating' })

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })
