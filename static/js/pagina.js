window.onload=function(){

listar()
}

function listar(){
pintar("/pagina/listarpagina",undefined,undefined,null,null,"IIDPAGINA")
}

function Cargar(array){
var objeto={
    "idpagina":array[0],
     "mensaje":array[1],
      "funcion":array[2],
       "nombreaplicacion":array[3]
}
Confirmacion(undefined,function(){
fetchPost("/pagina/guardarpagina/",objeto,function(){
    listar()
})
})
}