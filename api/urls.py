from django.urls import path
from . import views


urlpatterns = [
    #get all the blogpost
    path('getblogpost', views.getBlogs),

    #delete post using post id
    path('deletepost/<str:pk>', views.deletePost),

    #post new blog using "title" and "content"
    path('postdata', views.postData,),

    #auth the token if its valid or not
    path('token', views.verify_token),

    #visit post with slug
    path('post/<slug:slug>', views.slugpost),

    #Edit post "title" and "content"
    path('editpost/<str:pk>', views.editpost),

]
