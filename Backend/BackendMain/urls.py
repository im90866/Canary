from django.urls import path, re_path, include

from . import views
from .Views.auth_views import *
from .Views.project_views import *
from .Views.workspace_views import *
from .Views.home_views import *
from .Views.profile_views import *

urlpatterns = [
    # Auth Views
    path('signup/', SignupView.as_view()),
    path('login/', LoginView.as_view()),

    # Project Views
    path('createproject/', CreateProject.as_view()),
    path('deleteproject/', DeleteProject.as_view()),
    path('updateproject/', UpdateProjectName.as_view()),
    path('getproject/<str:username>', GetProjects.as_view()),

    # Workspace Views
    path('uploadImageWorkspace/', CreateImage.as_view()),
    path('uploadIm/', CreateSpecImage.as_view()),
    path('getWorkspace/<str:projectID>/<str:folderPath>', GetFolder.as_view()),
    path('createFolder/', CreateFolder.as_view()),

    path('postImage/', PostImage.as_view()),

    # Home Views
    path('getFeed/<str:username>', GetHomePosts.as_view()),
    path('search/<str:value>', SearchProfiles.as_view()),
    path('likePost/', LikePost.as_view()),

    # Profile Views
    path('getProfilePicture/<str:username>', GetProfilePicture.as_view()),
    path('changeProfilePicture/', ChangeProfilePicture.as_view()),

    # debug functions
    #path('backStuff/', views.getBack()),
    path('delete/', views.deleteAll),
    path('print/', views.deleteAll),
    path('returnImage/', views.ReturnImage.as_view()),
    path('csrf/', GetCSRFToken.as_view()),
]