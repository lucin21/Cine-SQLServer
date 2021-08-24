from django.urls import path
from . import views
urlpatterns=[
    path("listar/",views.MostrarPersona),
    path("listarpersona/",views.listarPersonaAsincrono),
    path("buscarpersona/", views.buscarPersonaAsincrono),
    #Mostrar pagina
    path("agregarpersona/", views.agregarpersona),
    path("editarpersona/", views.editarpersona),

    path("guardarpersona/", views.guardarpersona),
    path("listarPersonaSinUsuario/",views.listarPersonaSinUsuario),
]