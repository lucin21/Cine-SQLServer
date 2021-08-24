window.onload=function(){
listar()

}

function listar(){
    pintar("/cine/listarcine",undefined,undefined,true,true,"idcine")
    fetchRecuperar("/cine/listartipocine/",function(data){
        llenarCombo(data,"IDTIPOCINE","NOMBRE","cboTipocine")
    })
    $("#txtfechaapertura").datepicker({dateFormat:"dd/mm/yy",
    changeYear: true})

}

function buscarCine(){
//alert("Dimos click en boton")
var nombre=get("txtnombre")
if(nombre==""){
  pintar("/cine/listarcine")
}else{
  pintar("/cine/buscarcinepornombre/?nombrecito="+nombre
  ,undefined,undefined,true,true,"idcine")
}

}
function Editar(id){
/*
  fetch("/cine/recuperarcine/?idcine="+id)
  .then(res=>res.json())
  .then(res=>{
  /*
        alert(res[0])
        alert(JSON.stringify(res[0]))
        var objeto=res[0]

        set("txtidcine",objeto.idcine)
        set("txtnombrecine",objeto.nombre)
        set("txtdireccion",objeto.direccion)
  })
   */

  fetchRecuperar("/cine/recuperarcine/?idcine="+id,function(data){
    var objeto=data[0]
     set("txtidcine",objeto.idcine)
        set("txtnombrecine",objeto.nombre)
        set("txtdireccion",objeto.direccion)
        set("cboTipocine",objeto.idtipocine),
        set("txtfechaapertura",objeto.fechaapertura)
  })

}

function GuardarCine(){

var resultado=validarobligatorios(".formulariocine .form-control",["txtidcine"])
if(resultado.exito==true){
    //alert(resultado.contenido)
    document.getElementById("divErrores").innerHTML=resultado.contenido
    return;
}else{
document.getElementById("divErrores").innerHTML="";
}



var idcine=get("txtidcine")
var nombre=get("txtnombrecine")
var direccion=get("txtdireccion")
var token=document.getElementsByName("csrfmiddlewaretoken")[0].value
var idtipocine=get("cboTipocine")
var fechaapertura=get("txtfechaapertura")
var objeto={
   "idcine":idcine,
   "nombre":nombre,
   "direccion":direccion,
   "idtipocine":idtipocine,
   "fechaapertura":fechaapertura
}

Confirmacion(undefined,function(){
fetchPost("/cine/guardarcine/",objeto,function(){
    listar()
   limpiarControles(".formcine .form-control");
   document.getElementById("divErrores").innerHTML="";
})
})



/*
fetch("/cine/guardarcine/",{
     headers:{
        "Content-type":"application/json",
        "X-CSRFToken":token
    },
    method:"POST",
    body:JSON.stringify(objeto)
}).then(res=>res.text())
.then(res=>{
if(res==1){
listar()
}else{
alert("Ocurrio un error")
}


})
*/

}

function NuevoCine(){
   limpiarControles(".formcine .form-control");
}

function Eliminar(id){

Confirmacion("Desea eliminar realmente el cine",function(){
fetchDelete("/cine/eliminarcine/?idcine="+id,function(){
listar()
limpiarControles(".formcine .form-control");

})

})


}


/*
window.onload=function(){

    fetch("/cine/listarcine").then(res=>res.json())
    .then(res=>{
       var contenido="<table class='table'>";
        //alert(JSON.stringify(res));
        //alert(Object.keys(res[0])) ->array
        var keys=Object.keys(res[0]);
        contenido+="<thead><tr>";

        for(var i=0;i<keys.length;i++){
        contenido+="<td>";
        contenido+=keys[i].toUpperCase()
         contenido+="</td>";
        }
        contenido+="</tr></thead>";
        contenido+="<tbody>"
        var objeto
        var keyactual
        for(var i=0;i<res.length;i++){
         objeto=res[i]
            contenido+="<tr>";
             for(var j=0;j<keys.length;j++){
             keyactual=keys[j]
                contenido+="<td>"
                contenido+=objeto[keyactual]
                contenido+="</td>"
             }
          }
            contenido+="</tr>";

        contenido+="</tbody>"
        contenido+="</table>"
        document.getElementById("divTabla").innerHTML=contenido
    })

}
*/
