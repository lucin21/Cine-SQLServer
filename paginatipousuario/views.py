from django.shortcuts import render
from webconfig.Query import SQL
# Create your views here.
from django.http import HttpResponse
import json
def paginatipousuariohtml(request):
    return render(request,"paginatipousuario/paginatipousuario.html"
                  ,None)

def listarboton(request):
    odasql=SQL()
    lista=odasql.listarJSONWeb("exec uspListarBotones")
    return HttpResponse(lista)

def recuperarbotonpaginatipousuario(request):
    odasql=SQL()
    iidpaginatipousuario=request.GET.get("iidpaginatipousuario")
    lista=odasql.listarJSONWeb("exec "
    "uspRecuperarPaginasBotonTipoUsuario @idpaginatipousuario='{0}'"
                               .format(iidpaginatipousuario))
    return HttpResponse(lista)


def paginatipousuarioeditar(request):
    iidpaginatipousuario=request.GET.get("iidpaginatipousuario")
    return render(request,"paginatipousuario/editarpaginatipousuario.html"
                  ,{
                    "iidpaginatipousuario":iidpaginatipousuario
                  })

def listarpaginatipousuario(request):
    odasql=SQL()
    lista=odasql.listarJSONWeb("exec uspListarPaginaTipoUsuario")
    return HttpResponse(lista)

def filtrarpaginatipousuario(request):
    idtipousuario=request.GET.get("idtipousuario")
    odasql=SQL()
    lista=odasql.listarJSONWeb("exec uspFiltrarPaginaTipoUsuario "
    "@iidtipousuario='{0}'".format(idtipousuario))
    return HttpResponse(lista)

def guardardatos(request):
    objeto = json.loads(request.body.decode("utf-8"))
    checks=objeto["checks"]

    iidpaginatipousuario=objeto["iidpaginatipousuario"]
    odasql=SQL()
    rpta=odasql.enviarTransaccion("exec uspGuardarBotonesPaginaTipoUsuario "
            "@iidpaginatipousuario='{0}',@opciones='{1}'"
                           .format(iidpaginatipousuario,checks))
    return HttpResponse(rpta)




