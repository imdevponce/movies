from rest_framework.viewsets import ModelViewSet
from .models import Movie, Principal, Name
from .serializers import MovieSerializer, PrincipalSerializer, NameSerializer

class MovieViewSet(ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

class PrincipalViewSet(ModelViewSet):
    queryset = Principal.objects.all()
    serializer_class = PrincipalSerializer

class NameViewSet(ModelViewSet):
    queryset = Name.objects.all()
    serializer_class = NameSerializer