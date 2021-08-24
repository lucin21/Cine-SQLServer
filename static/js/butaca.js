window.onload=function(){
listar()
}


function listar(){
 pintar("/funcion/listarfuncionjson/",undefined,undefined,
    true,false,"idfuncion",false)

}

function Editar(id){
    document.location.href="/butaca/verbutacas/?idfuncion="+id
}

function abrirModalBusqueda(){

 setI("lblTitulo","Buscar o Seleccionar Persona")
       pintar("/cine/listarcine/","divTablaSubPopup","tablapopup",
    false,false,"idcine",false,undefined,undefined,
    true,"nombre")

}

function AsignarValores(id,nombre){
document.getElementById("btnCerrarPopup").click()
set("txtnombre",nombre)
set("txtidcine",id)
 pintar("/cine/buscarcine/?idcine="+id,undefined,undefined,
    true,false,"idfuncion",false)
}

function limpiarbutaca(){
listar()
set("txtnombre","")
set("txtidcine","")
}
