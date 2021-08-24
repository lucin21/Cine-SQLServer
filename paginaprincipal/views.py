from django.shortcuts import render

# Create your views here.

def PaginaPrincipal(request):
    idusuario=request.session["idusuario"]
    return render(request,"paginaprincipal/paginaprincipal.html",{
        "idusuario":idusuario
    })
