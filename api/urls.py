from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.PostListCreate.as_view(), name='post-list-create'),
    path('likes/', views.LikeCreate.as_view(), name='like-create'),
    path('likes/<int:pk>/', views.LikeDestroy.as_view(), name='like-destroy'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
]
