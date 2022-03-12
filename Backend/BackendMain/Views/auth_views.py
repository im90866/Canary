from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect
from django.utils.decorators import method_decorator

import json
from rest_framework import filters
from bson import json_util, ObjectId

from ..helper_functions import *
from ..custom_models import *

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
        email_col = CLIENT_DATABASE['emailList']
        
        try:
            if ifExists(data['username'], "username", 'userInfo'):
                return Response({ 'error': 'Username already exists' })
            elif ifExists(data['email'], "email", 'emailList'):
                return Response({ 'error: Account with given email already exists'})
            else:
                userModel = userInfo(data['username'], data['password'], data['email'])
                
                user_info = userModel.getModel()

                collection.insert_one(user_info)

                # authenticate email

                email_col.insert_one({'email': data['email']})
                return Response({ 'success': 'User created successfully' })
        except:
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

        usernameID = ""

        for x in collection.find(query):
            if x['password'] == password:
                    usernameID = json.loads(json_util.dumps(x['_id']))['$oid']
                    valid = True    
                  
        if valid:
            return Response({
                'success': 'User authenticated',
                'userID' : usernameID
            })
        else:
            return Response({ 'error': 'Error Authenticating' })

# class Search(APIView):
#     permission_classes = (permissions.AllowAny, )
#     def get(self, request, format=None):
#         queryset = CLIENT_DATABASE['userInfo'].find()
#         users = []
#         # for x in queryset:
#         #     print(x['username'])
#         #     # users.append(x)
#         filter_backends = [filters.SearchFilter]
#         search_fields = ['^username']
#         return Response({
#             'users working' : filter_backends
#         })
    


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })


