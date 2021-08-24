from django.shortcuts import render
from webconfig.Query import SQL
from django.http import HttpResponse
import json
def listarCine(request):
    return  render(request,"cine/cine.html",{

    })

def listarCineAsincrono(request):
    osql = SQL()
    lista = osql.listarJSON("exec uspListarCine")
    return  HttpResponse(json.dumps(lista))

def buscarcine(request):
    osql = SQL()
    idcine=request.GET.get("idcine")
    lista = osql.listarJSON("exec uspBuscarFuncionPorCine @idcine='{0}'"
                            .format(idcine))
    return  HttpResponse(json.dumps(lista))



def buscarCineAsincrono(request):
    nombre=request.GET.get("nombrecito")
    print(nombre)
    osql = SQL()
    lista = osql.\
        listarJSON("exec uspFiltrarCineDjango @nombre='{0}'".format(nombre))
    return  HttpResponse(json.dumps(lista))

def buscarCinePorId(request):
    idcine=request.GET.get("idcine")
    osql = SQL()
    print(idcine)
    objeto=osql.listarJSON("exec uspRecuperarCine @idcine='{0}' ".format(idcine))
    print(objeto)
    return HttpResponse(json.dumps(objeto))

def guardarCine(request):
    print(json.loads(request.body.decode("utf-8")))
    objeto=json.loads(request.body.decode("utf-8"))
    idcine = objeto["idcine"]
    nombre=objeto["nombre"]
    direccion=objeto["direccion"]
    idtipocine = objeto["idtipocine"]
    fechaapertura = objeto["fechaapertura"]
    print(fechaapertura)
    print(nombre)
    print(direccion)
    osql = SQL()
    nregistros=osql.enviarPost("exec uspGuardarCine @idcine='{0}' ,"
                    "@nombre='{1}', @direccion='{2}',"
                    "@idtipocine='{3}',@fechaapertura='{4}'".format(
        idcine,nombre,direccion,idtipocine,fechaapertura
    ))
    return HttpResponse(nregistros)

def listartipocine(request):
    osql=SQL()

    lista=osql.listarJSON("exec uspListarTipoCine")
    return HttpResponse(json.dumps(lista))

def eliminarcine(request):
    osql=SQL()
    idcine=request.GET.get("idcine")
    nregistros=osql.enviarPost("exec uspEliminarCine @idcine='{0}'"
                    .format(idcine))
    return  HttpResponse(nregistros)








# Create your views here.
