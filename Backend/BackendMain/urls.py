from django.urls import path, re_path, include

from . import views
from .Views.auth_views import *
from .Views.project_views import *
from .Views.workspace_views import *
from .Views.home_views import *
from .Views.profile_views import *
from .Views.chat_views import *
from .Views.setting_views import *
from .Views.other_workspace_views import *
from .Views.topbar_views import *
from .Views.post_views import *

urlpatterns = [
    # Auth Views
    path('signup/', SignupView.as_view()),
    path('login/', LoginView.as_view()),
    path('verifySignup/', VerifySignup.as_view()),
    path('deleteTemp/', DeleteTemp.as_view()),

    # Project Views
    path('createproject/', CreateProject.as_view()),
    path('deleteproject/', DeleteProject.as_view()),
    path('updateproject/', UpdateProjectName.as_view()),
    path('getproject/<str:username>', GetProjects.as_view()),
    path('getotherproject/<str:username>', GetGroupProjects.as_view()),
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

    # Project Team Views
    path('inviteUser/', SendRequest.as_view()),
    path('interactInvite/', InteractRequest.as_view()),
    path('getProjectMembers/<str:projectID>', GetProjectMembers().as_view()),

    # Home Views
    path('getFeed/<str:userID>', GetHomePosts.as_view()),
    path('search/<str:value>', SearchProfiles.as_view()),
    path('getNotifications/<str:userID>', GetNotifications.as_view()),
    path('getFeedLikes/', GetFeedLikes.as_view()),

    # Post Views
    path('getPost/<str:postID>/<str:userID>', GetPost.as_view()),
    path('likePost/', LikePost.as_view()),
    path('sendComment/', CommentPost.as_view()),
    path('remixPost/', RemixPost.as_view()),

    # Profile Views
    path('getProfilePicture/<str:userID>', GetProfilePicture.as_view()),
    path('changeProfilePicture/', ChangeProfilePicture.as_view()),
    path('getProfileFeed/<str:userID>', GetProfileFeed.as_view()),
    path('getUserID/<str:username>', GetUserID.as_view()),
    path('getUsername/<str:userID>', GetUsername.as_view()),

    # Chat Views
    path('checkChat/', CheckChat.as_view()),
    path('getChat/<str:userID>', GetChats.as_view()),
    path('getMessages/<str:chatID>/<str:userID>/<str:otherUserID>', GetMessages.as_view()),
    path('sendMessage/', SendMessage.as_view()),

    # Settings Views
    path('getUserInfo/<str:userID>', GetUserInfo.as_view()),
    path('uploadUserInfo/', UploadUserInfo.as_view()),
    path('checkUsername/<str:username>', UsernameExistCheck.as_view()),
    path('checkEmail/<str:email>', EmailExistCheck.as_view()),

    # debug functions
    #path('backStuff/', views.getBack()),
    path('delete/', views.deleteAll),
    path('print/', views.deleteAll),
    path('returnImage/', views.ReturnImage.as_view()),
    path('csrf/', GetCSRFToken.as_view()),
]