from django.shortcuts import render
from webconfig.Query import SQL
from django.http import HttpResponse
import json
# Create your views here.
def listarfuncion(request):
    return render(request,"funcion/funcion.html",None)

def listarfuncionjson(request):
    odasql=SQL()
    lista=odasql.listarJSONWeb("exec uspListarFuncion")
    return HttpResponse(lista)

def filtrarfuncionjson(request):
    odasql=SQL()
    idpelicula=request.GET.get("idpelicula")
    lista=odasql.listarJSONWeb("exec uspFiltrarFuncion  @idpelicula ='{0}'"
                               .format(idpelicula))
    return HttpResponse(lista)

def guardarfuncion(request):
    odasql=SQL()

    objeto=json.loads(request.body.decode("utf-8"))
    print(objeto)
    idfuncion=objeto["idfuncion"]
    fechafuncion=objeto["fechaFormateada"]
    idpelicula=objeto["idpelicula"]
    idcine=objeto["idcine"]
    idsala=objeto["idsala"]
    nregistros=odasql.enviarTransaccion("exec uspGuardarFuncion "
    "@idfuncion='{0}',@fechafuncion='{1}',@idpelicula ='{2}',"
    "@idcine='{3}',@idsala ='{4}'".format(idfuncion,fechafuncion,idpelicula,
                                          idcine,idsala))

    return HttpResponse(nregistros)

def buscarsala(request):
    odasql=SQL()
    idcine=request.GET.get("idcine")
    lista=odasql.listarJSONWeb("exec uspLlenarSala @idcine='{0}'"
                         .format(idcine))
    return HttpResponse(lista)

def recuperarfuncion(request):
    odasql=SQL()
    idfuncion=request.GET.get("idfuncion")
    obj=odasql.listarJSONWeb("exec uspRecuperarFuncion  @idfuncion='{0}'"
                         .format(idfuncion))
    return HttpResponse(obj)

def eliminarfuncion(request):
    idfuncion=request.GET.get("idfuncion")
    print(idfuncion)
    odasql=SQL()
    rpta=odasql.enviarPost("exec USPELIMINARFUNCION @IDFUNCION='{0}'"
                           .format(idfuncion))
    cadena="exec USPELIMINARFUNCION @IDFUNCION='{0}'".format(idfuncion)

    return HttpResponse(rpta)


