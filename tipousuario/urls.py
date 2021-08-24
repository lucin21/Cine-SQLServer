from django.urls import path
from . import views
urlpatterns=[
    path("listarasincrono/",views.listarasincrono),
    path("listar/", views.listar),
path("filtrartipousuariopornombre/", views.filtrartipousuariopornombre),
    path("agregar/", views.agregar),
    path("editar/", views.editar),
    path("recuperartipousuario/", views.recuperartipousuario),
    path("recuperardetalletipousuario/", views.recuperardetalletipousuario),
    path("guardartipousuario/", views.guardartipousuario),
    path("eliminartipousuario/", views.eliminartipousuario),
]