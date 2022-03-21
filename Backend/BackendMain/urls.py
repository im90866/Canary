from django.urls import path, re_path, include

from . import views
from .Views.auth_views import *
from .Views.project_views import *
from .Views.workspace_views import *
from .Views.home_views import *
from .Views.profile_views import *
from .Views.chat_views import *
from .Views.setting_views import *

urlpatterns = [
    # Auth Views
    path('signup/', SignupView.as_view()),
    path('login/', LoginView.as_view()),

    # Project Views
    path('createproject/', CreateProject.as_view()),
    path('deleteproject/', DeleteProject.as_view()),
    path('updateproject/', UpdateProjectName.as_view()),
    path('getproject/<str:username>', GetProjects.as_view()),
    path('getProjectName/<str:projectID>', GetProjectName.as_view()),

    # Workspace Views
    path('uploadImageWorkspace/', CreateImage.as_view()),
    path('uploadIm/', CreateSpecImage.as_view()),

    path('getFolder/<str:projectID>/<str:folderPath>', GetFolder.as_view()),
    path('createFolder/', CreateFolder.as_view()),
    path('renameFolder/', RenameFolder.as_view()),
    path('deleteFolder/', DeleteFolder.as_view()),

    path('postImage/', PostImage.as_view()),
    path('deleteImage/', DeleteImage.as_view()),
    path('renameImage/', RenameImage.as_view()),

    # Home Views
    path('getFeed/<str:userID>', GetHomePosts.as_view()),
    path('search/<str:value>', SearchProfiles.as_view()),
    path('likePost/', LikePost.as_view()),

    # Profile Views
    path('getProfilePicture/<str:userID>', GetProfilePicture.as_view()),
    path('changeProfilePicture/', ChangeProfilePicture.as_view()),
    path('getProfileFeed/<str:userID>', GetProfileFeed.as_view()),
    path('getUserID/<str:username>', GetUserID.as_view()),
    path('getUsername/<str:userID>', GetUsername.as_view()),

    # Chat Views
    path('checkChat/', CheckChat.as_view()),
    path('getChat/<str:userID>', GetChats.as_view()),
    path('getMessages/<str:chatID>/<str:userID>', GetMessages.as_view()),
    path('sendMessage/', SendMessage.as_view()),

    # Settings Views
    path('getUserInfo/<str:userID>', GetUserInfo.as_view()),
    path('uploadUserInfo/', UploadUserInfo.as_view()),

    # debug functions
    #path('backStuff/', views.getBack()),
    path('delete/', views.deleteAll),
    path('print/', views.deleteAll),
    path('returnImage/', views.ReturnImage.as_view()),
    path('csrf/', GetCSRFToken.as_view()),
]