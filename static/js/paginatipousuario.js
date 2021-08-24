window.onload=function(){
listar()
}

function listar(){
pintar("/paginatipousuario/listarpaginatipousuario/",undefined,undefined,
    true,false,"iidpaginatipousuario",false)
}

function abrirModalBusqueda(){

 setI("lblTitulo","Buscar o Seleccionar Tipo Usuario")
       pintar("/tipousuario/listarasincrono/","divTablaSubPopup","tablapopup",
    false,false,"IIDTIPOUSUARIO",false,undefined,undefined,
    true,"NOMBRE")

}

function AsignarValores(id,nombre){
document.getElementById("btnCerrarPopup").click()
set("txtnombre",nombre)
set("txtidtipousuario",id)
 pintar("/paginatipousuario/filtrarpaginatipousuario/?idtipousuario="+id,undefined,undefined,
    true,false,"iidpaginatipousuario",false)
}

function limpiarpaginatipousuario(){
listar()
set("txtidtipousuario","")
set("txtnombre","")
}

function Editar(id){
window.location.href=
"/paginatipousuario/paginatipousuarioeditar/?iidpaginatipousuario="+id
}