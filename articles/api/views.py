from .serializers import ArticleSerializer,TradeSerializer,UserDataSerializer
from articles.models import Article,Trade,UserData
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions
from rest_framework import filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()
    filter_backends = [DjangoFilterBackend,filters.SearchFilter]
    filterset_fields = ['createdBy','traded']
    search_fields = ['title']
    authentication_classes = (TokenAuthentication,) # Add this line
    permission_classes = (IsAuthenticated,)
    def get_permissions(self):
        if self.action == 'list' or self.action == 'retrieve':
            return [AllowAny(), ]        
        return super(ArticleViewSet, self).get_permissions() 
    def patch(self, request, pk):
        testmodel_object = self.get_object(pk)
        serializer = TestModelSerializer(testmodel_object, data=request.data, partial=True) # set partial=True to update a data partially
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(code=201, data=serializer.data)
        return JsonResponse(code=400, data="wrong parameters")
    

class TradeViewSet(viewsets.ModelViewSet):
    serializer_class = TradeSerializer
    queryset = Trade.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['recieverUsername','completed','instigatorUsername','recieverProductID','instigatorProductID','id']

class UserDataViewSet(viewsets.ModelViewSet):
    serializer_class = UserDataSerializer
    queryset = UserData.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['username','city']
    
'''


'''


'''
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)





class ArticleDetailView(RetrieveAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class ArticleCreateView(CreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleUpdateView(UpdateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class ArticleDeleteView(DestroyAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
'''

