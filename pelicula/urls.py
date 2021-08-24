from django.urls import path
from . import  views
urlpatterns=[
    path("listar/",views.listar),
    path("listarpelicula/", views.listarpelicula),
    path("listargenerojson/", views.listargenero),
    path("listartipocensurajson/", views.listartipocensura),
    path("recuperarpeliculajson/", views.recuperarpelicula),
    path("guardarpelicula/", views.guardarpelicula),
path("eliminarpelicula/", views.eliminarpelicula),

]