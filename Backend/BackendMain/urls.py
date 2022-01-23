from django.urls import path, include
from .views import LoginView, SignupView

urlpatterns = [
    #path('backStuff/', views.getBack),
    path('signup/', SignupView.as_view()),
    path('login/', LoginView.as_view()),
]