from django.urls import path
from .views import getRoutes, getNotes, getNote

urlpatterns = [
    path('',getRoutes, name="routers"),
    path('notes/',getNotes, name="notes"),
    path('notes/<str:pk>/',getNote, name="note"),
]
