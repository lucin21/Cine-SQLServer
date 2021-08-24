from django.shortcuts import render
from webconfig.Query import SQL
from django.http import  HttpResponse
import json
import hashlib
def listar(request):
    return render(request,"usuario/usuario.html",None)
# Create your views here.

def agregarusuario(request):
    return render(request,"usuario/agregarusuario.html",None)

def listartipousuario(request):
    odasql=SQL()
    lista=odasql.listarJSONWeb("exec uspListarTipousuario")
    return HttpResponse(lista)

def guardarusuario(request):
    odasql=SQL()
    objeto=json.loads(request.body.decode("utf-8"))
    idusuario=objeto["idusuario"]
    nombreusuario=objeto["nombreusuario"]
    contra=objeto["contra"]
    contra=hashlib.sha256(contra.encode()).hexdigest()
    idtipousuario=objeto["idtipousuario"]
    idpersona=objeto["idpersona"]
    nregistros=odasql.enviarTransaccion("exec uspGuardarUsuario @idusuario='{0}',"
    "@nombreusuario='{1}',@contra='{2}',@idtipousuario='{3}',"
    "@idpersona='{4}'".format(idusuario,nombreusuario,contra,
                              idtipousuario,idpersona))
    return HttpResponse(nregistros)

def listarusuarioasincrono(request):
    odasql=SQL()
    lista=odasql.listarJSONWeb("exec uspListarUsuario")
    return HttpResponse(lista)

def recuperarusuario(request):
    odasql=SQL()
    idusuario=request.GET.get("idusuario")
    lista=odasql.listarJSONWeb("exec uspRecuperarUsuario "
                               "@idusuario='{0}'".format(idusuario))
    return HttpResponse(lista)

def login(request):
    odasql=SQL()
    objeto=json.loads(request.body.decode("utf-8"))
    nombreusuario=objeto["nombreusuario"]
    contra=objeto["contra"]
    contra=hashlib.sha256(contra.encode()).hexdigest()
    print(nombreusuario)
    print(contra)
    rpta=odasql.listarJSON("exec uspLogin @nombreusuario='{0}' ,"
    "@contra='{1}'".format(nombreusuario,contra))
    #print(rpta)
    #print(type(rpta))
    data=rpta[0]
    #print(type(data))
    cantidad=data["cantidad"]
    if cantidad==1:
        listausuario=odasql.listarJSON("exec uspObtenerIdUsuario "
        "@nombreusuario='{0}',@contra='{1}'".format(nombreusuario,
                                                    contra))
        diccionariousuario= listausuario[0]
        idusuario=diccionariousuario["IDUSUARIO"]
        request.session["idusuario"]=idusuario
        idtipousuario = diccionariousuario["IDTIPOUSUARIO"]
        request.session["idtipousuario"] = idtipousuario
        print(idusuario)
        print(idtipousuario)
        return HttpResponse(idusuario)


    return HttpResponse(cantidad)
    #print(cantidad)






