from rest_framework import serializers
from articles.models import Article,Trade,UserData

class PatchModelSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        kwargs['partial'] = True
        super(PatchModelSerializer, self).__init__(*args, **kwargs)

class ArticleSerializer(PatchModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')
    class Meta:
        model = Article
        fields = ('id','title','content','image','image_url','createdBy','traded','city')
    def get_image_url(self, obj):
        return obj.image.url

class TradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trade
        fields = ('id','instigatorUsername','instigatorProductID','recieverUsername','recieverProductID','completed')

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ('username','city')
        
        

