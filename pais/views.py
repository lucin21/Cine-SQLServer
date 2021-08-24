from django.shortcuts import render

# Create your views here.

from django.urls import path

from django.shortcuts import render
from webconfig.Query import SQL
from django.http import HttpResponse
import json
def listar(request):
    odasql=SQL()
    listapais= odasql.listarJSON("exec uspListarPais")
    return render(request, "pais/pais.html",{
        "listapais":listapais,
        "nombre": ""
    })
def listarpaisjson(request):
    odasql = SQL()
    listapais = odasql.listarJSON("exec uspListarPais")
    return HttpResponse(json.dumps(listapais))

    '''
    return render(request,"pais/pais.html",{
        "saludo":"Hola amigos estoy que paso un parametro",
        "dias":["lunes","martes","miercoles","jueves"],
        "cursos":[{"curso":"C#","profesor":"Licito","envivo":True},
                  {"curso":"VB.Net","profesor":"Hurol","envivo":False}]
    })
    '''



def buscarpais(request):
    nombre=request.POST.get("nombre").strip()
    print(nombre)
    odasql=SQL()
    if nombre=="" or nombre==None:
        listapais = odasql.listarJSON("exec uspListarPais")
    else:
        listapais = odasql. \
            listarJSON("exec uspFiltrarPaisDjango @nombre={0}".format(nombre))


    return render(request, "pais/pais.html",{
        "listapais":listapais,
        "nombre":nombre
    })

def agregarPais(request):
    odasql=SQL()
    nombre=request.POST.get("nombre")
    idpais = request.POST.get("idpais")
    registrosAfectados=odasql.\
        enviarPost("exec uspGuardarPais @idpais='{0}', @nombre='{1}'"
                   .format(idpais,nombre))
    listapais = odasql.listarJSON("exec uspListarPais")
    return render(request, "pais/pais.html", {
        "listapais": listapais,
        "nombre": ""
    })
    print(nombre)
    print(idpais)

def recuperarPais(request):

    odasql = SQL()
    idpais=request.GET.get("idpais")
    objeto=odasql.listarJSON("exec uspRecuperarPais @idpais={0}"
                             .format(idpais))
    print(objeto[0])
    diccionario=objeto[0]
    nombre=diccionario["nombre"]
    print(nombre)
    listapais = odasql.listarJSON("exec uspListarPais")
    return render(request,"pais/pais.html",{
        "listapais": listapais,
        "nombre": nombre,
        "idpais":idpais
    })

def eliminarpais(request):
    idpais=request.GET.get("idpais")
    odasql = SQL()
    nregistros=odasql.enviarPost("exec uspEliminarPais @idpais='{0}'"
                      .format(idpais))
    if nregistros==1:
        listapais = odasql.listarJSON("exec uspListarPais")
        return render(request, "pais/pais.html", {
            "listapais": listapais,
            "nombre": ""
        })




