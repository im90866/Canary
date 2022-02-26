from django.urls import path, include

from . import views
from .Views.auth_views import *
from .Views.project_views import *
from .Views.workspace_views import *

urlpatterns = [
    path('signup/', SignupView.as_view()),
    path('login/', LoginView.as_view()),

    path('createproject/', CreateProject.as_view()),
    path('deleteproject/', DeleteProject.as_view()),
    path('updateproject/', UpdateProjectName.as_view()),
    path('getproject/<str:username>', GetProjects.as_view()),

    path('storeImageInWorkspace/', CreateImage.as_view()),
    path('getWorkspace/<str:projectID>/<str:folderName>/', GetFolder.as_view()),
    path('createFolder/', CreateFolder.as_view()),

    # debug functions
    #path('backStuff/', views.getBack()),
    path('delete/', views.deleteAll),
    path('print/', views.deleteAll),
    path('returnImage/', views.ReturnImage.as_view()),
    path('csrf/', GetCSRFToken.as_view()),
]