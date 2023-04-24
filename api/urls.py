from django.urls import path
from .views import getRoutes, getNotes, getNote

# pathは上から実行されるので、update-noteをnoteの前にする必要がある

urlpatterns = [
    path('',getRoutes, name="routers"),
    path('notes/',getNotes, name="notes"),
    path('notes/<str:pk>/',getNote, name="note"),
    # path('notes/create/',createNote, name="create-note"),
    # path('notes/<str:pk>/update/',updateNote, name="update-note"),
    # path('notes/<str:pk>/delete/',deleteNote, name="delete-note"),
]
