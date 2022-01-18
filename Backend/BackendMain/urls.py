from django.urls import path
from . import views

urlpatterns = [
    path('backStuff/', views.getBack),
]