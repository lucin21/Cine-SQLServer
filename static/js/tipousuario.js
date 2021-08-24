window.onload=function(){
listar()
}

function listar(){
pintar("/tipousuario/listarasincrono/",undefined,undefined,
    true,true,"IIDTIPOUSUARIO",false)
}

function Editar(id){
window.location.href="/tipousuario/editar/?idtipousuario="+id
}

function buscarTipoUsuario(){
var nombre=get("txtnombretipousuario")
pintar("/tipousuario/filtrartipousuariopornombre/?nombretipousuario="+nombre,undefined,undefined,
    true,true,"IIDTIPOUSUARIO",false)
}


function Eliminar(id){
Confirmacion(undefined,function(){

 fetchDelete("/tipousuario/eliminartipousuario/?idtipousuario="+id,function(data){

    Confirmacion()
     listar()
  })
})

}