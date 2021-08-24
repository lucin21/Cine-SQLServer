from django.urls import path
from . import views

urlpatterns = [
    path("paginaprincipal/",views.PaginaPrincipal),
    ]