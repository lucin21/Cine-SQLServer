from django.shortcuts import render
from webconfig.Query import SQL
from django.http import HttpResponse
import json
# Create your views here.
def listarsala(request):
    return render(request,"sala/sala.html",None)

def listarsalajson(request):
    odasql=SQL()
    listajson=odasql.listarJSONWeb("exec uspListarSala")
    return HttpResponse(listajson)

def filtrarsalajson(request):
    odasql=SQL()
    idcine=request.GET.get("idcine")
    listajson=odasql.listarJSONWeb("exec uspFiltrarSalaPorNombre "
    "@idcine='{0}'".format(idcine))
    return HttpResponse(listajson)

def recuperarsalajson(request):
    odasql=SQL()
    idsala=request.GET.get("idsala")
    listajson=odasql.listarJSONWeb("exec uspRecuperarSala "
    "@idsala='{0}'".format(idsala))
    return HttpResponse(listajson)
def guardarsala(request):
    objeto = json.loads(request.body.decode("utf-8"))
    idsala=objeto["idsala"]
    idcine=objeto["idcine"]
    nombre=objeto["nombre"]
    columnas=objeto["columnas"]
    filas=objeto["filas"]
    odasql=SQL()
    nregistrosafectados=odasql.enviarPost("exec uspGuardarSala @idsala='{0}',"
    "@idcine='{1}',@numerofilas='{2}',@numerocolumnas='{3}',"
    "@nombre='{4}'".format(idsala,idcine,columnas,filas,nombre))
    return  HttpResponse(nregistrosafectados)

def eliminarsala(request):
    idsala=request.GET.get("idsala")
    odasql=SQL()
    rpta=odasql.enviarPost("exec USPELIMINARSALA @IDSALA='{0}'"
                      .format(idsala))
    return  HttpResponse(rpta)


