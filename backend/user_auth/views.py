from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

# Views
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication, SessionAuthentication

# serilaizers
from .serializers import UserRegisterSerializer
from .serializers import UserLoginSerializer
from .serializers import UserInfoSerializer


class UserLoginAPIView(APIView):
    def post(self, request: Request, *args, **kargs):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            response = {
                "username": {
                    "detail": "User Does not exist!"
                }
            }
            if User.objects.filter(username=request.data['username']).exists():
                user = User.objects.get(username=request.data['username'])
                
                # dummy roles
                role = "user"
                if user.username == "admin":
                    role = "admin"

                if user.check_password(request.data['password']):
                    token, created = Token.objects.get_or_create(user=user)
                    response = {
                        "id": user.id,
                        "name": user.username,
                        "username": user.username,
                        "email": user.email,
                        "role": role,
                        "accessToken": token.key
                    }
                    return Response(response, status=status.HTTP_200_OK)
                else:
                    response = {
                        'detail': 'Incorrect password'
                    }
                    return Response(response, status=status.HTTP_400_BAD_REQUEST)
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegisterAPIView(APIView):
    def post(self, request: Request, *args, **kargs):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            token = Token.objects.get(user=User.objects.get(username=serializer.data['username']))
            response = {
                "id": serializer.data['id'],
                "name": serializer.data['username'],
                "username": serializer.data['username'],
                "email": serializer.data['email'],
                "accessToken": token.key
            }
            return Response(response, status=status.HTTP_200_OK)
        raise ValidationError(
            serializer.errors, code=status.HTTP_406_NOT_ACCEPTABLE)


class UserLogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, *args):
        token = Token.objects.get(user=request.user)
        token.delete()
        return Response({"status": True, "detail": "Logged out!"}, status=status.HTTP_200_OK)
    

class UserInfoAPIView(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request: Request, *args, **kargs):
        serializer = UserInfoSerializer(request.user)
        role = "user"
        if serializer.data['username'] == 'admin':
            role = "admin"
        return Response({**serializer.data, "role": role}, status=status.HTTP_200_OK)



