window.onload=function(){
listar()
}

function listar(){
pintar("/pagina/listarasincrono/",undefined,undefined,
    false,false,"IIDPAGINA",false,undefined,undefined,false,undefined,true)
}


function GuardarDatos(){
var resultado=validarobligatorios(".formtipousuario .form-control",
["txtidtipousuario"],true)

if(resultado.exito==false){
    //POST

    var objeto={
   "idtipousuario":get("txtidtipousuario"),
   "nombretipousuario":get("txtnombretipousuario"),
   "descripciontipousuario":get("txtdescripcion"),
   "checks":obtenerCheckSeleccionados()
}

Confirmacion(undefined,function(){
fetchPost("/tipousuario/guardartipousuario/",objeto,function(){
    window.location.href="/tipousuario/listar/"
})
})

}

}
