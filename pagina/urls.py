from django.urls import path
from . import views

urlpatterns = [
path("listarasincrono/", views.listarasincrono),
path("verpagina/", views.verpagina),
path("listarpagina/", views.listarpagina),
path("guardarpagina/", views.guardarpagina),
]