window.onload=function(){
$(".dataframe").DataTable()
$("#table").DataTable()
 var elemento= document.querySelectorAll(".dataframe")
        for(var i=0;i<elemento.length;i++){
            elemento[i].classList.add("table")
        }
}

function obtenerCheckSeleccionados(){

var checkboxs=document.getElementsByClassName("checkbox")
var ncheckboxs=checkboxs.length
var contenido=""
for(var i=0;i<ncheckboxs;i++){
if(checkboxs[i].checked==true){
   contenido+= checkboxs[i].id.replace("chk","")
   contenido+="*"
   }
}
if(contenido.length>0) contenido=contenido.substring(0,contenido.length-1)
return contenido

}

function clickcelda(td){
 var valor=td.getAttribute("data-valor")
 td.innerHTML=""
 td.insertAdjacentHTML("beforeend",
 `
 <input class='form form-control' type='text' value='${valor}' />
 `
 )
 var trfila=td.parentNode
 var ultimotd=  trfila.lastChild
 if(ultimotd.children.length==0){
 ultimotd.insertAdjacentHTML("beforeend",`
    <button class='btn btn-success' onclick='Cargar(GuardarElementos(this))'>Guardar</button>
    <button onclick='Cancelar(this)' class='btn btn-danger'>Cancelar</button>
 `)
 }


}

function GuardarElementos(btn){
 var trFila= btn.parentNode.parentNode
 var nhijos=trFila.children.length
 var valores=[]
 var elementoActual
 for(var i=0;i<nhijos-1;i++){
   elementoActual=trFila.children[i]
   if( elementoActual.children.length>0  && elementoActual.children[0].nodeName=="INPUT"){
        valores.push(elementoActual.children[0].value)
   }else{
        valores.push(elementoActual.getAttribute("data-valor"))
   }

 }
 return valores


}

function AgregarFila(id){
var tabla=document.getElementById(id)
//Figura
var propiedadId=tabla.getAttribute("data-propiedadId")
var objthead  =tabla.children[0]
var objtr=objthead.children[0]
var nnodos= objtr.children.length
var objtbody =tabla.children[1]
//Total de filas
var nfilas=objtbody.children.length
var trUltimo=objtbody.children[nfilas-1]
var propiedadNombre
//Pintar la fila
if(trUltimo.children[0].getAttribute("data-valor")!=""){
var contenido="<tr>"
var propiedadNombre
for(var i=0;i<nnodos-1;i++){
propiedadNombre=objthead.children[0].children[i].getAttribute("data-cabecera")
contenido+=`<td data-valor=''><input
${propiedadNombre==propiedadId ? `readonly` : `` }
 type='text' class='form form-control' /></td>`
}
contenido+=`
<td>
<button class='btn btn-danger' onclick='CancelarFila(this)'>
Cancelar</button>
<button class='btn btn-primary' onclick='Cargar(GuardarElementos(this))' >
Guardar</button>
</td>
`
contenido+="</tr>"


objtbody.insertAdjacentHTML("beforeend",contenido)
}

}

function CancelarFila(btn){
var tdActual= btn.parentNode
var trActual= tdActual.parentNode
 var padreTr=    trActual.parentNode
 padreTr.removeChild(trActual)
}

function Cancelar(btn){
 var tdActual= btn.parentNode
 var trActual=tdActual.parentNode
 var nhijos=trActual.children.length
 for(var i=0;i<nhijos-1;i++){
        tdObj=trActual.children[i]
        tdObj.innerHTML=tdObj.getAttribute("data-valor")
 }
 trActual.children[nhijos-1].innerHTML=""


}


var cabecerasJSON;
function pintar(url,IdDiv="divTabla",IdTabla="tabla",opcionEditar=false,
opcionEliminar=false,propiedadId="Id",IsPopup=false,titulos,propiedades,
subpopup=false,propiedadDisplay,isCheck=false,isCallback=false,callback){
 fetch(url).then(res=>res.json())
    .then(res=>{

       var contenido="<table data-propiedadId='"+propiedadId+"' id="+IdTabla+" class='table'>";
        //alert(JSON.stringify(res));
        //alert(Object.keys(res[0])) ->array
        if(res.length>0 || cabecerasJSON!=null || titulos!=null){
        var keys;
        if(res.length>0){
            if(propiedades==undefined)
             keys=Object.keys(res[0]);
             else
             keys=propiedades
          }
        else{
            //Aqui viene los bueno
            if(propiedades==undefined)
               keys=cabecerasJSON
             else
              keys=propiedades
               }
         if(res.length>0) {
         if(propiedades==undefined)
         cabecerasJSON=keys
          else
              keys=propiedades
         }
        contenido+="<thead><tr>";
        if(titulos==undefined){
        if(isCheck) contenido+="<td></td>"
        for(var i=0;i<keys.length;i++){
        contenido+="<td data-cabecera='"+keys[i]+"' >";
        contenido+=keys[i].toUpperCase()
         contenido+="</td>";
        }
        }else{
           if(isCheck) contenido+="<td></td>"
         for(var i=0;i<titulos.length;i++){
        contenido+="<td data-cabecera='"+keys[i]+"'>";
        contenido+=titulos[i].toUpperCase()
         contenido+="</td>";
        }
        }
        if(opcionEditar==true || opcionEliminar==true|| subpopup==true
        || (opcionEliminar==null && opcionEditar==null)){
        contenido+="<td>Operaciones</td>"
        }
        contenido+="</tr></thead>";
        contenido+="<tbody>"
        var objeto
        var keyactual
        for(var i=0;i<res.length;i++){
         objeto=res[i]
            contenido+="<tr>";
            if(isCheck)
            contenido+=`<td><input type='checkbox'
            class='checkbox' id='chk${objeto[propiedadId]}' /></td>`
             for(var j=0;j<keys.length;j++){
             keyactual=keys[j]
                contenido+=`<td
                ${(opcionEditar==null && opcionEliminar==null && keyactual!=propiedadId )
                ? `ondblclick='clickcelda(this)'   ` :
                 `` }

                 ${(opcionEditar==null && opcionEliminar==null)
                 ? `data-valor='${objeto[keyactual]}'`:``}

                >`
                contenido+=objeto[keyactual]
                contenido+="</td>"
             }
             if(opcionEditar==true || opcionEliminar==true|| subpopup==true
             || (opcionEliminar==null && opcionEditar==null)){
             contenido+="<td>"

                if(opcionEditar==true){
                 contenido+=`
                 <i class='btn btn-primary'
                   ${IsPopup ? ` data-toggle="modal"
                    data-target="#exampleModal"`
                   : ``}
                  onclick='Editar(${objeto[propiedadId]})'>
                    <svg width="1em" height="1em"
                     viewBox="0 0 16 16" class="bi bi-brush"
                     fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                    d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.117 8.117 0 0 1-3.078.132 3.658 3.658 0 0 1-.563-.135 1.382 1.382 0 0 1-.465-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.393-.197.625-.453.867-.826.094-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.2-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.175-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.247-.013-.574.05-.88.479a11.01 11.01 0 0 0-.5.777l-.104.177c-.107.181-.213.362-.32.528-.206.317-.438.61-.76.861a7.127 7.127 0 0 0 2.657-.12c.559-.139.843-.569.993-1.06a3.121 3.121 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.591 1.927-5.566 4.66-7.302 6.792-.442.543-.796 1.243-1.042 1.826a11.507 11.507 0 0 0-.276.721l.575.575zm-4.973 3.04l.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043l.002.001h-.002z"/>
                        </svg>
                        </i>
                 `
                }
                if(opcionEliminar==true){
                contenido+=`
                <i class='btn btn-danger'
                  onclick='Eliminar(${objeto[propiedadId]})'
                  >
                <svg width="1em" height="1em" viewBox="0 0 16 16"
                 class="bi bi-trash-fill" fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg">
                 <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                  </svg>
                  </i>

                `
                }
                if(subpopup==true){

                contenido+=`<i class="btn btn-success"
                onclick="AsignarValores(${objeto[propiedadId]},'${objeto[propiedadDisplay]}')"
                >
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                 <path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
                  </svg>
                </i>
                `



                }

                 contenido+="</td>"
             }
          }
            contenido+="</tr>";

        contenido+="</tbody>"
        }
        contenido+="</table>"
        document.getElementById(IdDiv).innerHTML=contenido
        $("#"+IdTabla).DataTable()
          if(isCallback==true){
        callback()
    }
    })


}

function get(id){
return document.getElementById(id).value;
}

function getI(id){
return document.getElementById(id).innerHTML
}

function set(id,valor){
document.getElementById(id).value=valor
}

function setI(id,valor){
document.getElementById(id).innerHTML=valor
}
function setS(id,valor){
document.getElementById(id).src=valor
}

function getS(id){
return document.getElementById(id).src
}

function setD(id,valor){
document.getElementById(id).style.display=valor
}

function fetchRecuperar(url,callback){
    fetch(url)
  .then(res=>res.json())
  .then(res=>{
    callback(res)
  })
 }

 function fetchGet(url,callback){
    fetch(url)
  .then(res=>res.json())
  .then(res=>{
    callback(res)
  })
 }

  function fetchDelete(url,callback){
    fetch(url)
  .then(res=>res.text())
  .then(res=>{
    if(res==1)
       callback()
    else
        Error()
  })
 }

function fetchLogin(url,objeto,callback){

 var token=document.getElementsByName("csrfmiddlewaretoken")[0].value

 fetch(url,{
     headers:{
        "Content-type":"application/json",
        "X-CSRFToken":token
    },
    method:"POST",
    body:JSON.stringify(objeto)
}).then(res=>res.text())
.then(res=>{
if(res>0){
//Correcto()
callback()
}else{
Error()
}

 });

 }


 function fetchPost(url,objeto,callback){

 var token=document.getElementsByName("csrfmiddlewaretoken")[0].value

 fetch(url,{
     headers:{
        "Content-type":"application/json",
        "X-CSRFToken":token
    },
    method:"POST",
    body:JSON.stringify(objeto)
}).then(res=>res.text())
.then(res=>{
if(res==1){
Correcto()
callback()
}else{
Error()
}

 });

 }

 function limpiarControles(selectorCSS){
 var controles=document.querySelectorAll(selectorCSS)
var ncontroles=controles.length
for(var i=0;i<ncontroles;i++){
if( controles[i].nodeName=="INPUT"){
  controles[i].value=""
}else if( controles[i].nodeName=="SELECT"){
controles[i].value="0"
}else if(controles[i].nodeName=="TEXTAREA"){
  controles[i].value=""
}else if(controles[i].nodeName=="IMG"){
  controles[i].src=""
}

 }
 }


 function llenarCombo(data,propiedadId,propiedadMostrar,idCombo){
    var contenido="";
    contenido+="<option value='0'>--Seleccione--</option>"
    var elementoActual
    for(var i=0;i<data.length;i++){
    elementoActual=data[i]
    contenido+="<option value='"+elementoActual[propiedadId]+"'>";
    contenido+=elementoActual[propiedadMostrar]+"</option>"
    }
    document.getElementById(idCombo).innerHTML=contenido;
 }




  function validarobligatorios(selectorCSS,camposObviar=[],
  campoAcampo=false){
  var errores="<ol class='alert alert-danger'>";
  var hayerrores=false;
 var controles=document.querySelectorAll(selectorCSS)
var ncontroles=controles.length
var control
for(var i=0;i<ncontroles;i++){
   control= controles[i]
    if(control.tagName=="SELECT"){
      if(campoAcampo==false){
        if(control.value=="0" && camposObviar.indexOf(control.id)==-1){
        hayerrores=true;
        errores+="<li>Debe ingresar el "
        if(control.getAttribute("data-campo")==null)
        errores+= control.id.replace("cbo","")
        else
        errores+= control.getAttribute("data-campo")
        errores+="</li>"

        }
        }else{
        //Campo a campo
        if(control.value=="0" && camposObviar.indexOf(control.id)==-1){
            hayerrores=true;
            if(document.getElementById("div"+control.id)){
              if(control.getAttribute("data-campo")==null){
                document.getElementById("div"+control.id)
                .innerHTML="<span style='color:red'>Debe ingresar el "+
                control.id.replace("cbo","")+"</span>"
                }
              else{
                document.getElementById("div"+control.id)
                .innerHTML="<span style='color:red'>Debe ingresar el "+
                control.getAttribute("data-campo")+"</span>"
                }

            }

        }else{
         if(document.getElementById("div"+control.id))
        document.getElementById("div"+control.id)
                .innerHTML=""
        }

        }
    }else if(control.tagName=="INPUT" ||control.tagName=="TEXTAREA"){
    if(campoAcampo==false){
    if(control.value=="" && camposObviar.indexOf(control.id)==-1){
        hayerrores=true;
        errores+="<li>Debe ingresar el "
         if(control.getAttribute("data-campo")==null)
        errores+= control.id.replace("txt","")
         else
        errores+= control.getAttribute("data-campo")
        errores+="</li>"

    }
    }else{
    if(control.value=="" && camposObviar.indexOf(control.id)==-1){
         hayerrores=true;
         if(document.getElementById("div"+control.id)){

          if(control.getAttribute("data-campo")==null){
             document.getElementById("div"+control.id)
                .innerHTML="<span style='color:red'>Debe ingresar el "+
                control.id.replace("txt","")+"</span>"
          }else{
            document.getElementById("div"+control.id)
                .innerHTML="<span style='color:red'>Debe ingresar el "+
                control.getAttribute("data-campo")+"</span>"
          }

         }

    }else{
     if(document.getElementById("div"+control.id))
     document.getElementById("div"+control.id)
                .innerHTML=""
    }

    }

    }
    }

errores+="</ol>"
    return{
        exito:hayerrores,
        contenido:errores
    }
 }

 function Error(texto="Ocurrio un error"){
 Swal.fire({
  icon: 'error',
  title: 'Error',
  text: texto

})
 }

 function Confirmacion(texto="Desea guardar los cambios?",callback){
  return Swal.fire({
  title: 'Confirmacion',
  text: texto,
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si'
}).then((result) => {
  if (result.isConfirmed) {
    callback()
  }
})
 }

 function Correcto(titulo="Se guardo correctamente"){
 Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: titulo,
  showConfirmButton: false,
  timer: 1500
})
 }


