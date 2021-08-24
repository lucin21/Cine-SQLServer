from django.urls import path
from . import  views
urlpatterns=[
path("listar/",views.listar),
path("login/",views.login),
path("listarusuarioasincrono/",views.listarusuarioasincrono),
path("agregarusuario/",views.agregarusuario),
path("recuperarusuario/",views.recuperarusuario),
path("listartipousuario/",views.listartipousuario),
path("guardarusuario/",views.guardarusuario),
    ]