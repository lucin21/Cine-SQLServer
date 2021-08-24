from . import views
from django.urls import path
urlpatterns=[
    path("listarsala/", views.listarsala),
    path("listarsalajson/", views.listarsalajson),
    path("filtrarsalajson/", views.filtrarsalajson),
    path("recuperarsalajson/", views.recuperarsalajson),

    path("guardarsala/", views.guardarsala),
    path("eliminarsala/", views.eliminarsala)

]