from django.urls import path
from . import views

urlpatterns = [
path("verboton/", views.verboton),
path("listarboton/", views.listarboton),
]
