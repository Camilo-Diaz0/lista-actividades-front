let autHeader = "";

const obtenerCookie = () =>{
    let cookies =document.cookie;
    if(cookies.length != 0){
        cookies = cookies.split(";");
        let actualCookie;
        for(i = 0; cookies.length > i ;i++){
            actualCookie = cookies[i].trim();
            if(actualCookie.startsWith("jwt")){
                return actualCookie.split("=")[1];
            }
        }
    }
    return "";
}
const probar = ()=>{
    fetch("http://localhost:8080/api/pruebas")
        .then(res => {
            console.log(res);
        }).catch(e => console.log(e))
}
const getDatos = async()=>{
    try{ 
        let peticion = await fetch("http://localhost:8080/api/actividades",{
            method : "GET",
            headers :{
                "Content-Type" : "application/json",
                "Authorization" : autHeader
            },
            })
        if(peticion.ok){
            console.log("ok")
        }else if(peticion.status === 404){
            console.log("no found")
        }else if(peticion.status === 403){
            console.log("bloqueado parcero")
            location.href = "login.html"
        }else console.log("ni idea")
    }catch(e){
        console.log("manejado perro")
    }
}

addEventListener("load", x => {
    console.log("holaaaa")
    let cookie = obtenerCookie();
    if(cookie !== ""){
        autHeader = cookie;
    }
    getDatos();
    //probar();     
})