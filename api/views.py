from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import BlogPost
from .serializers import BlogPostSerializer
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def postData(request):
    data = JSONParser().parse(request)
    serializer =  BlogPostSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'true':True})
    else:
        return Response({'error': serializer.errors})                        



@api_view(['GET'])
def getBlogs(request):
    post = BlogPost.objects.all()
    serializer =  BlogPostSerializer(post, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def slugpost(request, slug):
    try:
        post = BlogPost.objects.get(slug = slug)
        serializer =  BlogPostSerializer(post)
        return Response(serializer.data)
    except: 
        return Response({'error':'The slug is not valid'})

@api_view(['PUT'])
def editpost(request, pk):
    post = BlogPost.objects.get(id=pk)
    data = JSONParser().parse(request)
    serializer =  BlogPostSerializer(post, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response({'Fedback':'Post was update successfuly'})
    else: return Response(serializer.errors)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deletePost(request, pk):
    post = BlogPost.objects.get(id=pk)
    post.delete()
    return Response({"success": True})

@api_view(['GET'])
def randomdata(request):
    return Response({'context':'random shit'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_token(request):
    user = request.user
    data = {
        'verify' : True,
        'username': user.username,
        'email': user.email,
        'date_joined': user.date_joined
    }
    token = Token.objects.get(user=user)

    if token:
        return Response(data)
    else:
        return Response({"success": False})

