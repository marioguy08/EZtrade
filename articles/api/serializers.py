from rest_framework import serializers
from articles.models import Article,Trade,UserData

class PatchModelSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(PatchModelSerializer, self).__init__(*args, **kwargs)
class ArticleSerializer(PatchModelSerializer):
    class Meta:
        model = Article
        fields = ('id','title','content','image','createdBy','traded','city')

class TradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trade
        fields = ('id','instigatorUsername','instigatorProductID','recieverUsername','recieverProductID','completed')

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ('username','city')
        

