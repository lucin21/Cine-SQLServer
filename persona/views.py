from django.shortcuts import render
from webconfig.Query import SQL
from django.http import  HttpResponse
import json
# Create your views here.

def MostrarPersona(request):
    return render(request,"persona/persona.html",None)

def listarPersonaAsincrono(request):
    osql = SQL()
    lista = osql.listarJSON("exec uspListarPersona")
    return  HttpResponse(json.dumps(lista))

def listarPersonaSinUsuario(request):
    osql = SQL()
    lista = osql.listarJSON("exec uspListarPersonaSinUsuario")
    return  HttpResponse(json.dumps(lista))

def buscarPersonaAsincrono(request):
    nombrecompleto=request.GET.get("nombrecompleto")
    osql = SQL()
    lista = osql.\
        listarJSON("exec uspFiltrarPersonaDjango @nombre='{0}'".format(nombrecompleto))
    return HttpResponse(json.dumps(lista))

def agregarpersona(request):

    osql=SQL()
    listasexo=osql.listarJSON("exec uspListarSexo")
    return render(request,"persona/agregarpersona.html",{
        "listasexo":listasexo
    })

def guardarpersona(request):
    objetoError={}
    exiteError=False
    osql = SQL()
    idpersona=request.POST.get("idpersona")
    dni = request.POST.get("dni")
    if dni=="":
        objetoError["dni"]="Debe ingresar su DNI"
        exiteError=True
    nombre = request.POST.get("nombre")
    if nombre == "":
        objetoError["nombre"] = "Debe ingresar su Nombre"
        exiteError = True
    appaterno = request.POST.get("appaterno")
    if appaterno == "":
        objetoError["appaterno"] = "Debe ingresar su Apellido paterno"
        exiteError = True
    apmaterno = request.POST.get("apmaterno")
    if apmaterno == "":
        objetoError["apmaterno"] = "Debe ingresar su Apellido materno"
        exiteError = True
    fechanacimiento = request.POST.get("fechanac")
    direccion = request.POST.get("direccion")
    telefonofijo = request.POST.get("telefonofijo")
    telefonocelular = request.POST.get("telefonocelular")
    idsexo=request.POST.get("idsexo")
    objetodata={
        "idpersona":idpersona,
        "dni": dni,
        "nombre":nombre,
        "appaterno":appaterno,
        "apmaterno":apmaterno,
        "fechanac":fechanacimiento,
        "direccion":direccion,
        "telefonofijo":telefonofijo,
        "telefonocelular":telefonocelular,
        "idsexo":int(idsexo)
    }
    if idsexo == 0:
        objetoError["idsexo"] = "Seleccione el sexo"
        exiteError = True
    if exiteError==False:
        numeroregistros = osql.enviarPost("exec uspGuardarPersona "
        "@idpersona='{0}',@dni='{1}',@nombre='{2}',@appaterno='{3}',"
        "@apmaterno='{4}',@fechanac='{5}',@direccion='{6}',"
        "@telefonofijo='{7}',@telefonocelular='{8}',@idsexo='{9}'"
        .format(idpersona, dni, nombre, appaterno, apmaterno, fechanacimiento,
        direccion, telefonofijo, telefonocelular, idsexo
                                                  ))
        if numeroregistros == 1 :
            return render(request, "persona/persona.html", None)
        else:
            listasexo = osql.listarJSON("exec uspListarSexo")

            return render(request, "persona/agregarpersona.html", {
                "objetoError": objetoError,
                "objetoData": objetodata,
                "listasexo": listasexo
            })

    else:
        listasexo = osql.listarJSON("exec uspListarSexo")

        return render(request, "persona/agregarpersona.html", {
            "objetoError": objetoError,
            "objetoData":objetodata,
            "listasexo": listasexo,
        })





def editarpersona(request):
    osql=SQL()
    print(request.GET.get("dni"))
    dni=request.GET.get("dni")
    recuperarDatos=osql.listarJSON("exec "
    "uspRecuperarPersona @dni='{0}' ".format(dni))
    print(recuperarDatos[0])
    idpersona=recuperarDatos[0]["idpersona"]
    nombre=recuperarDatos[0]["nombre"]
    idsexo=recuperarDatos[0]["idsexo"]

    listasexo=osql.listarJSON("exec uspListarSexo")
    return render(request,"persona/editarpersona.html",{
        "listasexo":listasexo,
        "obj":recuperarDatos[0],
        "idpersona":idpersona,
        "idsexo":idsexo


    })




'''
def guardarpersona(request):
    osql = SQL()
    idpersona = request.POST.get("idpersona")
    dni = request.POST.get("dni")
    nombre = request.POST.get("nombre")
    appaterno = request.POST.get("appaterno")
    apmaterno = request.POST.get("apmaterno")
    fechanacimiento = request.POST.get("fechanac")
    direccion = request.POST.get("direccion")
    telefonofijo = request.POST.get("telefonofijo")
    telefonocelular = request.POST.get("telefonocelular")
    numeroregistros=osql.enviarPost("exec uspGuardarPersona "
    "@idpersona='{0}',@dni='{1}',@nombre='{2}',@appaterno='{3}',"
    "@apmaterno='{4}',@fechanac='{5}',@direccion='{6}',"
    "@telefonofijo='{7}',@telefonocelular='{8}',@idsexo='{9}'"
    .format(idpersona,dni,nombre,appaterno,apmaterno,fechanacimiento,
            direccion,telefonofijo,telefonocelular,1
            ))
    if numeroregistros==1:
        return render(request,"persona/persona.html",None)
    else:
        return render(request,"persona/agregarpersona.html",None)

'''

