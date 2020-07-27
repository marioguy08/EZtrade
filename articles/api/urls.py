from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings
from .views import ArticleViewSet,TradeViewSet,UserDataViewSet
router = DefaultRouter()
router.register(r'articles', ArticleViewSet, basename='articles')
router.register(r'trade', TradeViewSet, basename='trade')
router.register(r'users', UserDataViewSet, basename='users')
urlpatterns = router.urls + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



'''
from django.urls import path
from .views import (
    ArticleListView,
    ArticleDetailView,
    ArticleCreateView,
    ArticleUpdateView,
    ArticleDeleteView,
    UserViewSet
)

urlpatterns = [
    path('', ArticleListView.as_view()),
    path('create/', ArticleCreateView.as_view()),
    path('<pk>', ArticleDetailView.as_view()),
    path('<pk>/update/', ArticleUpdateView.as_view()),
    path('<pk>/delete/', ArticleDeleteView.as_view())

]

'''

