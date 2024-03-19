from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
# Create your views here.

######################### USER CONTROLLERS##################################

@api_view(['POST'])
def welcome_pal(request):
    return Response("Hii Buddy")

