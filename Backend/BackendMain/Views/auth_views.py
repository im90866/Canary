from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt, csrf_protect
from django.utils.decorators import method_decorator

from django.core.mail import send_mail
from django.template.loader import get_template

import pymongo, datetime
import json
from random import randint
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

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        temp_user_col = CLIENT_DATABASE['tempUserInfo']
        email_col = CLIENT_DATABASE['emailList']
        
        
        if ifExists(data['username'], "username", 'userInfo'):  # CHECK TEMP COL AS WELL
            return Response({ 'error': 'Username already exists' })
        elif ifExists(data['email'], "email", 'emailList'):
            return Response({ 'error: Account with given email already exists'})
        else:
            user_info = userInfo(data['username'], data['password'], data['email']).getModel()

            signCode = randint(100000,999999)
            while(ifExists(signCode, "signCode", 'tempUserInfo')):
                signCode = randint(100000, 999999)

            signCode = str(signCode)

            utc_timestamp = datetime.utcnow()

            mergeVal = {
                'expireAt': utc_timestamp,
                'signCode': signCode 
            }

            tempVal = {**user_info, **mergeVal}

            temp_user_col.create_index('expireAt', expireAfterSeconds=60*3)
            temp_user_col.insert_one(tempVal)

            print(tempVal)

            # send code to email
            body = 'You\'re almost there!\n To finish setting up your account, enter the following code:\n\t'
            body = body + signCode + '\nThe following code will expire on '+ datetime.utcnow().strftime("%B %-d, %Y %-I:%M:%S %p") + 'UTC'
            body = body + '\n\nIf the code does not work, please request a new verification code.'

            send_mail(
                'Verify Your Canary Email Address',
                body,
                'madebyteamcanary@gmail.com',
                [data['email']],
                fail_silently=False,
            )

            return Response({
                'success':'Request sent to mail'
            })

        
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

class DeleteTemp(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        temp_user_col = CLIENT_DATABASE['tempUserInfo']
        email_col = CLIENT_DATABASE['emailList']
        
        email_col.insert_one({'email': data['email']})

        return Response({ 'success': 'CSRF cookie set' })

class ResendCode(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        temp_user_col = CLIENT_DATABASE['tempUserInfo']
        email_col = CLIENT_DATABASE['emailList']

        temp_user_col.delete_one({'username': data['username']})

        tempVal = userInfo(data['username'], data['password'], data['email']).getModel()

        signCode = randint(100000,999999)
        while(ifExists(signCode, "signCode", 'tempUserInfo')):
            signCode = randint(100000, 999999)

        signCode = str(signCode)

        tempVal['expireAt'] = datetime.utcnow()
        tempVal['signCode'] = signCode

        temp_user_col.create_index('expireAt', expireAfterSeconds=60*3)
        temp_user_col.insert_one(tempVal)

        print(tempVal)

        # send code to email
        body = 'You\'re almost there!\n To finish setting up your account, enter the following code:\n\t'
        body = body + signCode + '\nThe following code will expire on '+ datetime.utcnow().strftime("%B %-d, %Y %-I:%M:%S %p") + 'UTC'
        body = body + '\n\nIf the code does not work, please request a new verification code.'

        send_mail(
            'Verify Your Canary Email Address',
            body,
            'madebyteamcanary@gmail.com',
            [data['email']],
            fail_silently=False,
        )

        return Response({
            'success':'Request sent to mail'
        })        

class VerifySignup(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        temp_user_col = CLIENT_DATABASE['tempUserInfo']
        email_col = CLIENT_DATABASE['emailList']

        print(data)
        
        tempVal = temp_user_col.find_one({'username': data['username']})

        if str(data['signCode']) == str(tempVal['signCode']):
            # delete the tempval
            temp_user_col.delete_one({'username': tempVal['username']})

            email_col.insert_one({'email': tempVal['email']})
            
            # add the tempval value to usercol
            tempVal.pop('signCode', None)
            tempVal.pop('expireAt', None)

            userID = user_col.insert_one(tempVal).inserted_id
            userID = json.loads(json_util.dumps(userID))['$oid']

            return Response({ 
                'success': 'Created account',
                'username': data['username'],
                'userID': userID
            })
        else:
            return Response({ 'error': 'Wrong code' })

class ForgotPassword(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        temp_user_col = CLIENT_DATABASE['tempUserInfo']
        email_col = CLIENT_DATABASE['emailList']

        signCode = randint(100000,999999)
        while(ifExists(signCode, "signCode", 'tempUserInfo') or ifExists(signCode, "signCode", 'userInfo')):
            signCode = randint(100000, 999999)

        signCode = str(signCode)

        user_col.update_one({
            'email': data['email']
        }, {
            '$set': {
                'signCode': signCode
            }
        })

         # send code to email
        body = 'Your account\'s password was requested to be changed. Enter the following code:\n\t'
        body = body + signCode + '\nThe following code will expire on '+ datetime.utcnow().strftime("%B %-d, %Y %-I:%M:%S %p") + 'UTC'
        body = body + '\n\nIf the code does not work, please request a new verification code.'
        body = body + '\n\nIf this was not you, ignore this email as no changes will be made to your account.'

        print(body)
        send_mail(
            'Forgot your Canary password',
            body,
            'madebyteamcanary@gmail.com',
            [data['email']],
            fail_silently=False,
        )

        return Response({
            'success':'Request sent to mail'
        })

class VerifyForgotPassword(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        temp_user_col = CLIENT_DATABASE['tempUserInfo']
        email_col = CLIENT_DATABASE['emailList']

        userVal = user_col.find_one({'email': data['email']})

        if str(data['signCode']) == str(userVal['signCode']):
            
            # add the tempval value to usercol
            user_col.update_one({
                
            })

            return Response({ 
                'success': 'Created account',
            })
        else:
            return Response({ 'error': 'Wrong code' })

class ForgotPasswordVerify(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        user_col = CLIENT_DATABASE['userInfo']
        temp_user_col = CLIENT_DATABASE['tempUserInfo']
        email_col = CLIENT_DATABASE['emailList']

        print(data)
        
        userVal = user_col.find_one({'username': data['username']})

        if str(data['signCode']) == str(userVal['signCode']):
            # add the tempval value to usercol
             user_col.update_one({
                'username': data['username']
            }, {
                '$unset': {
                    'signCode': data['signCode']
                }
            })

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })


