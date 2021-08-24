from django.urls import path
from . import  views
urlpatterns=[
    path("listar/",views.listar),
    #path("agregar/",views.agregarpais),
    path("buscarpais/", views.buscarpais),
    path("agregarpais/", views.agregarPais),
    path("recuperarpais/", views.recuperarPais),
    path("listarpaisjson/", views.listarpaisjson),
    path("eliminarpais/", views.eliminarpais),

]