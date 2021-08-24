from django.shortcuts import render
from webconfig.Query import SQL
# Create your views here.
from django.http import HttpResponse
import  json
def listar(request):

    return render(request,"pelicula/pelicula.html",None)

def listarpelicula(request):
    odasql=SQL()
    listardata=odasql.listarJSON("exec uspListarPelicula")
    return HttpResponse(json.dumps(listardata))

def listargenero(request):
    odasql=SQL()
    listardata=odasql.listarJSON("exec uspListarGenero")
    return HttpResponse(json.dumps(listardata))

def listartipocensura(request):
    odasql=SQL()
    listardata=odasql.listarJSON("exec uspListarTipoCensura")
    return HttpResponse(json.dumps(listardata))
def recuperarpelicula(request):
    odasql=SQL()
    idpelicula=request.GET.get("idpelicula")
    listardata=odasql.listarJSON("exec uspRecuperarPelicula "
                                 "@idpelicula='{0}'".format(idpelicula))
    return HttpResponse(json.dumps(listardata))

def guardarpelicula(request):
    objeto=json.loads(request.body.decode("utf-8"))
    print(objeto)
    odasql=SQL()
    idpelicula=objeto["idpelicula"]
    titulo=objeto["titulo"]
    duracion=objeto["duracion"]
    idgenero=objeto["idgenero"]
    idpais=objeto["idpais"]
    idtipocensura = objeto["idtipocensura"]
    sinopsis = objeto["sinopsis"]
    fechaestreno = objeto["fechaestreno"]
    foto = objeto["foto"]
    nregistrosafectados=odasql.enviarPost("exec uspGuardarPelicula @idpelicula='{0}',"
    "@titulo='{1}',@idgenero='{2}',@idpais='{3}',@sinopsis='{4}',"
    "@duracion='{5}',@idtipocensura='{6}',@foto='{7}',"
    "@fechaestreno='{8}'".format(idpelicula,titulo,idgenero,idpais,
    sinopsis,duracion,idtipocensura,foto,fechaestreno))
    print(idpelicula)
    print(nregistrosafectados)
    return HttpResponse(nregistrosafectados)

def eliminarpelicula(request):
    idpelicula=request.GET.get("idpelicula")
    odasql=SQL()
    nregistros=odasql.enviarPost("exec uspEliminarPelicula @idpelicula='{0}'"
                      .format(idpelicula))
    print(idpelicula)
    print(nregistros)
    return HttpResponse(nregistros)





