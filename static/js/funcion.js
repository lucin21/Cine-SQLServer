window.onload=function(){
listar()
}


function listar(){
 pintar("/funcion/listarfuncionjson/",undefined,undefined,
    true,true,"idfuncion",true)

    fetchGet("/pelicula/listarpelicula/",function(data){
     llenarCombo(data,"IDPELICULA","TITULO","cboPeliculaBuscar")
      llenarCombo(data,"IDPELICULA","TITULO","cboIdPeliculaPopup")
      obtenerSala()
    })

       fetchGet("/cine/listarcine/",function(data){
     llenarCombo(data,"idcine","nombre","cboIdCinePopup")

    })




}

function filtrarFuncionPorPelicula(){
var idpelicula=get("cboPeliculaBuscar")
 pintar("/funcion/filtrarfuncionjson/?idpelicula="+idpelicula,undefined,
 undefined,
    true,true,"idfuncion",true)
}

function Editar(id){

  limpiarControles(".formfuncion .form-control");
  obtenerSala()
setI("divErrores","")
if(id==0) {

setI("lblTitulo","Agregar Funcion")
setD("divSalaPopup","block")
setD("divCinePopup","block")
}
else{
setI("lblTitulo","Editar Funcion")
setD("divSalaPopup","none")
setD("divCinePopup","none")

fetchGet("/funcion/recuperarfuncion/?idfuncion="+id,function(data){
var objeto=data[0]
set("txtidfuncion",objeto.idfuncion)
set("txtfechafuncion",objeto.fechafuncion)
set("cboIdPeliculaPopup",objeto.idpelicula)


})

}
}

function obtenerSala(){
var idcine=get("cboIdCinePopup")
fetchGet("/funcion/buscarsala/?idcine="+idcine,function(data){
 llenarCombo(data,"idsala","NOMBRE","cboIdSalaPopup")
})
}

function GuardarDatos(){

if(get("txtidfuncion")==""){
var obj=validarobligatorios(".formfuncion .form-control",
["txtidfuncion"])
if(obj.exito==true){
   document.getElementById("divErrores").innerHTML=obj.contenido;
    return;
}
}else{
var obj=validarobligatorios(".formfuncion .form-control",
["txtidfuncion","cboIdCinePopup","cboIdSalaPopup"])
if(obj.exito==true){
   document.getElementById("divErrores").innerHTML=obj.contenido;
    return;
}

}


idfuncion=get("txtidfuncion")
fecha=get("txtfechafuncion")
//(fecha)
// dd/mm/yyyy hh:mm
var fechaMoment=moment(fecha)
var fechaFormateada=fechaMoment.format("DD/MM/YYYY HH:mm")
//alert(fechaFormateada)
idpelicula=get("cboIdPeliculaPopup")
idcine=get("cboIdCinePopup")
idsala=get("cboIdSalaPopup")

var objeto={
idfuncion,
idpelicula,
idcine,
idsala,
fechaFormateada
}

fetchPost("/funcion/guardarfuncion/",objeto,function(){
       listar()
       limpiarControles(".formfuncion .form-control");
       document.getElementById("btnCerrarPopup").click()
       setI("divErrores","")

})


}

function Eliminar(id){
Confirmacion(undefined,function(){

fetchDelete("/funcion/eliminarfuncion/?idfuncion="+id,function(){
    listar()


})

})

}