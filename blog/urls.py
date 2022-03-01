from django.urls import path
from .views import *


urlpatterns = [

    path('', home, name='blog-home'),
    path("blog/<str:pk>/", post_detail, name='post_detail'),
    path("dashboard/", dashboard, name='dashboard')
]