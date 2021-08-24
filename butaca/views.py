from django.shortcuts import render
from webconfig.Query import SQL
from django.http import HttpResponse
import json
def mostrarButaca(request):
    return  render(request,"butaca/butaca.html",{

    })

def verbutacas(request):
    idfuncion=request.GET.get("idfuncion")
    return  render(request,"butaca/verButacas.html",{
        "idfuncion":idfuncion
    })
# Create your views here.

def buscarbutacas(request):
    idfuncion = request.GET.get("idfuncion")
    odasql=SQL()
    lista=odasql.listarJSONWeb("exec uspRecuperarButacas @idfuncion='{0}'"
                         .format(idfuncion))
    return HttpResponse(lista)

def eliminarbutaca(request):
    idfuncion = request.GET.get("idfuncion")
    idbutaca = request.GET.get("idbutaca")
    odasql=SQL()
    rpta=odasql.enviarPost("exec uspDeshabilitarButaca @idfuncion='{0}',"
                      "@idbutaca ='{1}'".format(idfuncion,idbutaca))
    return  HttpResponse(rpta)
