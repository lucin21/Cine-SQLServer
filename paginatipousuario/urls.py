from django.urls import path
from . import views

urlpatterns = [
path("paginatipousuariohtml/", views.paginatipousuariohtml),
path("paginatipousuarioeditar/", views.paginatipousuarioeditar),
path("listarpaginatipousuario/", views.listarpaginatipousuario),
path("filtrarpaginatipousuario/", views.filtrarpaginatipousuario),
path("listarboton/", views.listarboton),
path("guardardatos/", views.guardardatos),
path("recuperarbotonpaginatipousuario/", views.recuperarbotonpaginatipousuario),
]