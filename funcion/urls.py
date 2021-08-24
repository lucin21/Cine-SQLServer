from . import views
from django.urls import path
urlpatterns = [
    path("listarfuncion/",views.listarfuncion),
    path("listarfuncionjson/", views.listarfuncionjson),
    path("filtrarfuncionjson/", views.filtrarfuncionjson),
    path("guardarfuncion/", views.guardarfuncion),
    path("buscarsala/", views.buscarsala),
    path("recuperarfuncion/", views.recuperarfuncion),
    path("eliminarfuncion/", views.eliminarfuncion),

]