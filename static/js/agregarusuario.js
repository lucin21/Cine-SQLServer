function GuardarDatos(){
var resultado=validarobligatorios(".formusuario .form-control",
["txtidusuario"],true)

if(resultado.exito==false){
    //POST

    var objeto={
   "idusuario":get("txtidusuario"),
   "nombreusuario":get("txtnombreusuario"),
   "contra":get("txtcontrausuario"),
   "idtipousuario":get("txtidtipousuario"),
   "idpersona":get("txtidpersona")
}

Confirmacion(undefined,function(){
fetchPost("/usuario/guardarusuario/",objeto,function(){
    window.location.href="/usuario/listar/"
})
})

}


}

function AbrirModal(nombre){
if(nombre=="TipoUsuario"){
    setI("lblTitulo","Buscar o Seleccionar Tipo Usuario")
    pintar("/usuario/listartipousuario/",undefined,undefined,
    false,false,"iidtipousuario",false,undefined,undefined,
    true,"nombre")
}else{
    setI("lblTitulo","Buscar o Seleccionar Persona")
       pintar("/persona/listarPersonaSinUsuario/",undefined,undefined,
    false,false,"idpersona",false,undefined,undefined,
    true,"NombreCompleto")
}
}

function AsignarValores(id,nombre){
document.getElementById("btnCerrarPopup").click()
var titulo= getI("lblTitulo")
if(titulo=="Buscar o Seleccionar Tipo Usuario"){
    set("txtnombretipousuario",nombre)
    set("txtidtipousuario",id)
}else{
 set("txtnombrepersona",nombre)
  set("txtidpersona",id)
}

}