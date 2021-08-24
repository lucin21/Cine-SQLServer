window.onload=function(){
listar()
}

function listar(){
 pintar("/sala/listarsalajson/",undefined,undefined,
    true,true,"IDSALA",true,
    ["SALA","CINE","NUM COLUMNA","NUM FILA"],
     ["NOMBRESALA","NOMBRECINE","NUMEROCOLUMNAS","NUMEROFILAS"])

    fetchGet("/cine/listarcine/",function(data){
     llenarCombo(data,"idcine","nombre","cboCineBuscar")
     llenarCombo(data,"idcine","nombre","cboCinePopup")
    })

}
function Buscar(){
    var idcine=get("cboCineBuscar")
     pintar("/sala/filtrarsalajson/?idcine="+idcine,undefined,undefined,
    true,true,"IDSALA",true,
    ["SALA","CINE","NUM COLUMNA","NUM FILA"],
    ["NOMBRESALA","NOMBRECINE","NUMEROCOLUMNAS","NUMEROFILAS"])
}


function Editar(id){
  limpiarControles(".formsala .form-control");
setI("divErrores","")
if(id==0) setI("lblTitulo","Agregar Sala")
else{
setI("lblTitulo","Editar Sala")
fetchGet("/sala/recuperarsalajson/?idsala="+id,function(data){
var objeto=data[0]
set("txtidsala",objeto.IDSALA)
set("txtnombresala",objeto.NOMBRE)
set("txtcolumnas",objeto.NUMEROCOLUMNAS)
set("txtfila",objeto.NUMEROFILAS)
set("cboCinePopup",objeto.IDCINE)

})

}
}

function GuardarDatos(){

var obj=validarobligatorios(".formsala .form-control",
["txtidsala"])
if(obj.exito==true){
   document.getElementById("divErrores").innerHTML=obj.contenido;
    return;
}
var objeto={
"idsala":get("txtidsala"),
"idcine":get("cboCinePopup"),
"nombre":get("txtnombresala"),
"columnas":get("txtcolumnas"),
"filas":get("txtfila")
}

Confirmacion("Desea guardar datos de la sala?",function(){
fetchPost("/sala/guardarsala/",objeto,function(){
        listar()
       limpiarControles(".formsala .form-control");
       document.getElementById("btnCerrarPopup").click()
       setI("divErrores","")

})

})

}

function Eliminar(id){
Confirmacion(undefined,function(){

fetchDelete("/sala/eliminarsala/?idsala="+id,function(){
    listar()


})

})

}