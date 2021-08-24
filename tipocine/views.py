from django.shortcuts import render
from webconfig.Query import SQL
# Create your views here.

def listarTipoCine(request):
    odasql=SQL()
    listatipocine=odasql.listarHTML("uspListarTipoCine")
    return render(request,"tipocine/tipocine.html",{
        "lista":listatipocine,
    })
def buscarTipoCine(request):
    nombre=request.POST.get("nombre")
    odasql=SQL()
    listatipocine=odasql.\
        listarHTML("uspFiltrarTipoCineDjango @nombre='{0}'".format(nombre))
    return render(request,"tipocine/tipocine.html",{
        "lista":listatipocine,
        "nombre":nombre
    })
