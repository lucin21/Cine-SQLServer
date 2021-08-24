from django.shortcuts import render
from webconfig.Query import SQL
from django.http import  HttpResponse
# Create your views here.
import json
def listarasincrono(request):
    odasql=SQL()
    lista=odasql.listarJSONWeb("exec uspListarTipoUsuarioBD")
    return  HttpResponse(lista)

def listar(request):

    return  render(request,"tipousuario/tipousuario.html",None)

def agregar(request):

    return  render(request,"tipousuario/agregartipousuario.html",None)

def editar(request):
    idtipousuario=request.GET.get("idtipousuario")
    return  render(request,"tipousuario/editartipousuario.html",{
        "idtipousuario":idtipousuario
    })

def guardartipousuario(request):
    odasql=SQL()
    objeto=json.loads(request.body.decode("utf-8"))
    idtipousuario=objeto["idtipousuario"]
    nombretipousuario=objeto["nombretipousuario"]
    descripciontipousuario=objeto["descripciontipousuario"]
    checks=objeto["checks"]
    rpta=odasql.enviarTransaccion("exec uspGuardarTipoUsuario @idtipousuario='{0}',"
    "@nombretipousuario='{1}',@descripciontipousuario='{2}',"
                             "@opciones ='{3}'".format(idtipousuario,nombretipousuario,
                                                       descripciontipousuario,checks))
    return HttpResponse(rpta)

def recuperartipousuario(request):
    odasql=SQL()
    idtipousuario=request.GET.get("idtipousuario")
    lista=odasql.listarJSONWeb("exec uspRecuperarTipoUsuario "
        "@idtipousuario='{0}'".format(idtipousuario))
    return HttpResponse(lista)

def recuperardetalletipousuario(request):
    odasql=SQL()
    idtipousuario=request.GET.get("idtipousuario")
    lista=odasql.listarJSONWeb("exec uspRecuperarPaginasTipoUsuario "
        "@idtipousuario='{0}'".format(idtipousuario))
    return HttpResponse(lista)

def filtrartipousuariopornombre(request):
    odasql=SQL()
    nombretipousuario=request.GET.get("nombretipousuario")
    lista=odasql.listarJSONWeb("exec uspFiltrarTipousuarioPorNombre "
        "@nombre='{0}'".format(nombretipousuario))
    return HttpResponse(lista)

def eliminartipousuario(request):
    odasql=SQL()
    idtipousuario=request.GET.get("idtipousuario")
    rpta=odasql.enviarPost("exec uspELiminarTipoUsuario "
    "@idtipousuario ='{0}'".format(idtipousuario))
    return HttpResponse(rpta)





