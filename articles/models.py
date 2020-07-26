from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Article(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField()
    image = models.ImageField(upload_to = 'images', blank=True)
    createdBy = models.CharField(max_length=120)
    traded = models.BooleanField(default=False)
    city = models.CharField(max_length=120)

    def __str__(self):
        return self.title


class Trade(models.Model):
    instigatorUsername = models.CharField(max_length=120)
    instigatorProductID = models.ForeignKey(Article, related_name='+',on_delete=models.CASCADE)
    recieverUsername = models.CharField(max_length=120)
    recieverProductID = models.ForeignKey(Article, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.instigatorUsername

class UserData(models.Model):
    username = models.CharField(max_length=120)
    city = models.CharField(max_length=120)
    def __str__(self):
        return self.username