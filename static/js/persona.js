window.onload=function(){
pintar("/persona/listarpersona",
undefined,undefined,true,true,"dni")
}

function buscarPersona(){
var nombre=get("txtnombrecompleto")
pintar("/persona/buscarpersona/?nombrecompleto="+nombre,
undefined,undefined,true,true,"dni")
}

function Editar(id){
document.location.href="/persona/editarpersona/?dni="+id
}

function Eliminar(id){
Confirmacion(undefined,function(){


})

}