from django.shortcuts import render
from webconfig.Query import SQL
from django.http import HttpResponse
import  json
# Create your views here.

def listarasincrono(request):
    odasql=SQL()
    lista=odasql.listarJSONWeb("exec uspListarPaginas")
    return HttpResponse(lista)
def listarpagina(request):
    odasql=SQL()
    lista=odasql.listarJSONWeb("exec uspListarPaginasBD")
    return HttpResponse(lista)
def verpagina(request):
    return render(request,"pagina/pagina.html",None)
def guardarpagina(request):
    objeto = json.loads(request.body.decode("utf-8"))
    idpagina=objeto["idpagina"]
    mensaje = objeto["mensaje"]
    funcion = objeto["funcion"]
    nombreaplicacion = objeto["nombreaplicacion"]

    odasql=SQL()
    registrosAfectados=odasql.enviarPost("exec  uspGuardarPagina "
    "@idpagina='{0}',@mensaje='{1}',@funcion ='{2}',"
    "@nombreaplicacion='{3}'".format(idpagina,mensaje,funcion,
                                     nombreaplicacion))
    return  HttpResponse(registrosAfectados)

