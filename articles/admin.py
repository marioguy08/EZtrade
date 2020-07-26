from django.contrib import admin
from .models import Article
from .models import Trade
from .models import UserData
# Register your models here.
admin.site.register(Trade)
admin.site.register(Article)
admin.site.register(UserData)

