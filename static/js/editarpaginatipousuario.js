window.onload=function(){
listar()
}

function listar(){
pintar("/paginatipousuario/listarboton/",undefined,undefined,
    false,false,"iidboton",false,undefined,undefined,false,undefined,true,
    true,function(){
        recuperarBotonesSeleccionadas()
    })


}

function  recuperarBotonesSeleccionadas(){
var idpaginatipousu=get("txtidpaginatipousuario")
fetchGet(
"/paginatipousuario/recuperarbotonpaginatipousuario/?iidpaginatipousuario="+idpaginatipousu,
function(data){
var objActual
for(var i=0;i<data.length;i++){
    objActual=data[i]
    document.getElementById("chk"+objActual["iidboton"]).checked=true

}

})

}

function GuardarDatos(){

 var objeto={
    "iidpaginatipousuario":get("txtidpaginatipousuario"),
     "checks":obtenerCheckSeleccionados()
 }

 Confirmacion(undefined,function(){
fetchPost("/paginatipousuario/guardardatos/",objeto,function(){
    window.location.href="/paginatipousuario/paginatipousuariohtml/"
})
})


}
