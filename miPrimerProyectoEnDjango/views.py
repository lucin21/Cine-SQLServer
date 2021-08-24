from django.http import  HttpResponse
from django.shortcuts import render
def Saludo(request):
    return HttpResponse("Hola mundo")
def Curso(request):
    return HttpResponse("Bienvido al curso de Django con Python")
def MiPrimeraPagina(request):
    return render(request,"inicio.html",None)
def Login(request):
    return render(request,"login/login.html",None)
