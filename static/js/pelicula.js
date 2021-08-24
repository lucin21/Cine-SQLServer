window.onload=function(){
listar()
$("#txtfechaestreno").datepicker({dateFormat:"dd/mm/yy",
    changeYear: true})
    //llenarCombo(data,propiedadId,propiedadMostrar,idCombo)
    //fetchRecuperar(url,callback)
    fetchRecuperar("/pais/listarpaisjson/",function(data){
        llenarCombo(data,"idpais","nombre","cboPais")
    })
    fetchRecuperar("/pelicula/listargenerojson/",function(data){
        llenarCombo(data,"idgenero","nombre","cboGenero")
    })
    fetchRecuperar("/pelicula/listartipocensurajson/",function(data){
        llenarCombo(data,"idtipocensura","nombre","cboTipocensura")
    })
}

function listar(){
    pintar("/pelicula/listarpelicula/",undefined,undefined,
    true,true,"IDPELICULA",true)



}

function previewFoto(){
var archivo=document.getElementById("fupFoto").files[0]
var file=new FileReader()

file.onloadend=function(){
//alert(file.result)
    document.getElementById("imgFoto").src= file.result;
}

file.readAsDataURL(archivo)
}
/*
function AbrirModal(){
     setI("lblTitulo","Agregar Pelicula")
}
*/

function Editar(id){
limpiarControles(".formpelicula .form-control");
setI("divErrores","")
if(id==0) setI("lblTitulo","Agregar Pelicula")
else{
setI("lblTitulo","Editar Pelicula")
fetchGet("/pelicula/recuperarpeliculajson/?idpelicula="+id,function(data){
var objeto=data[0]
set("txtidpelicula",objeto.IDPELICULA)
set("txttitulo",objeto.TITULO)
set("txtduracion",objeto.DURACION)
set("cboGenero",objeto.IDGENERO)
set("cboPais",objeto.IDPAIS)
set("cboTipocensura",objeto.IDTIPOCENSURA)
set("txtsinopsis",objeto.SINOPSIS)
set("txtfechaestreno",objeto.FECHAESTRENOCADENA)
setS("imgFoto",objeto.FOTO)
})

}
}

function GuardarDatos(){

var objeto={
   "idpelicula":get("txtidpelicula"),
   "titulo":get("txttitulo"),
   "duracion":get("txtduracion"),
   "idgenero":get("cboGenero"),
   "idpais":get("cboPais"),
   "idtipocensura":get("cboTipocensura"),
   "sinopsis":get("txtsinopsis"),
   "fechaestreno":get("txtfechaestreno"),
    "foto":getS("imgFoto")
}

var obj=validarobligatorios(".formpelicula .form-control",
["txtidpelicula"])
if(obj.exito==true){
   document.getElementById("divErrores").innerHTML=obj.contenido;
    return;
}

Confirmacion("Desea guardar los cambios de la pelicula en BD",function(){
        fetchPost("/pelicula/guardarpelicula/",objeto,function(){
    listar()
   limpiarControles(".formpelicula .form-control");
   document.getElementById("btnCerrarPopup").click()
   document.getElementById("divErrores").innerHTML="";
})
})


}

function Eliminar(id){
Confirmacion(undefined,function(){

 fetchDelete("/pelicula/eliminarpelicula/?idpelicula="+id,function(data){

    Confirmacion()
     listar()

  })


})

}