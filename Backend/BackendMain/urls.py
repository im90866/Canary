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

    path('storeImageInWorkspace/', StoreImage.as_view()),

    # debug functions
    #path('backStuff/', views.getBack()),
    path('delete/', views.deleteAll),
    path('print/', views.deleteAll),
]