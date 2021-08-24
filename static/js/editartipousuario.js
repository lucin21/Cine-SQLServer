window.onload=function(){
listar()
}

function listar(){
pintar("/pagina/listarasincrono/",undefined,undefined,
    false,false,"IIDPAGINA",false,undefined,undefined,false,undefined,true,
    true,function(){
        recuperarPaginasSeleccionadas()
    })
    recuperarTipoUsuario()

}

function  recuperarPaginasSeleccionadas(){
var idtipousuariovalor=get("txtidtipousuariohidden")
fetchGet("/tipousuario/recuperardetalletipousuario/?idtipousuario="+idtipousuariovalor,
function(data){
var objActual
for(var i=0;i<data.length;i++){
    objActual=data[i]
    document.getElementById("chk"+objActual["iidpagina"]).checked=true

}

})

}

function recuperarTipoUsuario(){
var idtipousuariovalor=get("txtidtipousuariohidden")
fetchGet("/tipousuario/recuperartipousuario/?idtipousuario="+idtipousuariovalor,
function(data){
var obj=data[0]
set("txtidtipousuario",obj.iidtipousuario)
set("txtnombretipousuario",obj.nombre)
set("txtdescripcion",obj.descripcion)
})
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
