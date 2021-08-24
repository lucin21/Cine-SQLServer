window.onload=function(){
    listar()
}

function listar(){
var idfuncion=get("txtidfuncion")
fetchGet("/butaca/buscarbutacas/?idfuncion="+idfuncion,function(data){
var objeto=data[data.length-1]
var indicefila=objeto.INDICEFILA
var indicecolumna=objeto.INDICECOLUMNA
var objeto
var contador=0
var contenido="<div>"
for(var i=0;i< indicefila;i++){
contenido+="<div style='display:flex'>"
    for(var j=0;j<indicecolumna;j++){
        objeto=data[contador]
        contenido+=`
                <div
                ondblclick="mostrarMensaje(${objeto.BHABILITADO},
                ${objeto.BLIBRE},${contador+1})"
                style="width:60px;height:60px;margin:16px;
                color:white;display:flex;justify-content:center;
                align-items:center;font-weight:bold;
                background-color:
                ${objeto.BHABILITADO==true  ?
                `${objeto.BLIBRE==true?"blue":"red"}`:"gray"
                }

                ">${contador+1}

                </div>

                 `

        contador++
    }
   contenido+="</div>"
}
 contenido+="</div>"
 setI("divTabla",contenido)

})
}

function mostrarMensaje(habilitado,libre,numerobutaca){
var idfuncion=get("txtidfuncion")

if(habilitado==true && libre==true){
Confirmacion("Desea deshabilitar la butaca numero "+numerobutaca,function(data){
fetchDelete("/butaca/eliminarbutaca/?idfuncion="+
idfuncion+"&idbutaca="+numerobutaca,function(data){
listar()
})

})
}

}