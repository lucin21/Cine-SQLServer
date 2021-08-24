from django.shortcuts import render
from webconfig.Query import SQL
from django.http import HttpResponse
# Create your views here.
def verboton(request):
    return render(request,"boton/boton.html",None)

def listarboton(request):
    odasql=SQL()
    lista=odasql.listarJSONWeb("exec uspListarBotonBD")
    return HttpResponse(lista)
