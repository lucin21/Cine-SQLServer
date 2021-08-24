window.onload=function(){
listar()
}

function listar(){
pintar("/usuario/listarusuarioasincrono/",undefined,undefined,
    true,true,"idusuario",true)
}

function AbrirModalSubpopup(){
setI("lblTitulo","Buscar o Seleccionar Tipo Usuario")
    pintar("/usuario/listartipousuario/","divTablaSubpopup","tablasubpopup",
    false,false,"iidtipousuario",false,undefined,undefined,
    true,"nombre")

}

function AsignarValores(id,nombre){
document.getElementById("btnCerrarSubPopup").click()
set("txtidtipousuario",id)
set("txtnombretipousuario",nombre)

}

function GuardarDatos(){
var resultado=validarobligatorios(".formusuario .form-control",
[],true)
if(resultado.exito==false){

//
var objeto={
   "idusuario":get("txtidusuario"),
   "nombreusuario":get("txtnombreusuario"),
   "idtipousuario":get("txtidtipousuario"),
    "contra":"",
    "idpersona":0
}

Confirmacion(undefined,function(){
fetchPost("/usuario/guardarusuario/",objeto,function(){
    listar()
    document.getElementById("btnCerrarPopup").click()
})
})


//

}

}

function Editar(id){

fetchGet("/usuario/recuperarusuario/?idusuario="+id,function(data){
    set("txtidusuario",data[0].idusuario)
      set("txtnombreusuario",data[0].NOMBREUSUARIO)
        set("txtidusuario",data[0].idusuario)
        set("txtnombretipousuario",data[0].NOMBRE)
        set("txtidtipousuario",data[0].idtipousuario)

})

}