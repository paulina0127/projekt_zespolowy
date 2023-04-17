# from rest_framework import generics, permissions
# from .models import User
# from .utils.serializers import UserSerializer
# from apps.core.utils.permissions import IsOwner


# class UserDetail(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     name = "user-detail"
#     permission_classes = [permissions.IsAuthenticated, IsOwner]
