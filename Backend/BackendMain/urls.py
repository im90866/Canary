from django.urls import path, include
from . import views

urlpatterns = [
    #path('backStuff/', views.getBack),
    path('signup/', views.SignupView.as_view()),
    path('login/', views.LoginView.as_view()),
    path('delete/', views.deleteAll),
    path('print/', views.deleteAll),
]