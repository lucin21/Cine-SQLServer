function Ingresar(){
var objeto={
    "nombreusuario":get("txtusuario"),
     "contra":get("txtcontra")
}
Confirmacion(undefined,function(){
fetchLogin("/usuario/login/",objeto,function(){
    document.location.href="/paginaprincipal/paginaprincipal"
})
})


}