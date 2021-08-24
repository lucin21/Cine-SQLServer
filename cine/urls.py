from django.urls import  path
from . import views
urlpatterns=[
    path("listar/",views.listarCine),
    path("listarcine/",views.listarCineAsincrono),
    path("listartipocine/", views.listartipocine),

    path("buscarcinepornombre/", views.buscarCineAsincrono),
    path("guardarcine/", views.guardarCine),
    path("recuperarcine/", views.buscarCinePorId),
    path("eliminarcine/", views.eliminarcine),
    path("buscarcine/", views.buscarcine),

]