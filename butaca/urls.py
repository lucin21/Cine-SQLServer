from . import views
from django.urls import  path
urlpatterns=[
    path("mostrarbutaca/",views.mostrarButaca),
    path("verbutacas/", views.verbutacas),
    path("buscarbutacas/", views.buscarbutacas),
    path("eliminarbutaca/", views.eliminarbutaca),
    ]