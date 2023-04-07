from django.urls import path
from rest_framework.authtoken import views
from .views import loginPage

urlpatterns = [
    path('loginpage', loginPage, name="loginPage"),
    path('api/login', views.obtain_auth_token)
]
