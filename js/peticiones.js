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
const newActividad = async(metodo,mensaje,id) => {
    let url = "http://localhost:8080/api/actividades";
    if(metodo === "DELETE") url = `http://localhost:8080/api/actividades/${id}`;
    if(mensaje != null) mensaje = JSON.stringify(mensaje);
    try{ 
        let peticion = await fetch(url,{
            method : metodo,
            headers :{
                "Content-Type" : "application/json",
                "Authorization" : autHeader
            },
            body : mensaje
            })
        if(peticion.ok){
            console.log("ok")
            let respuesta = await peticion.json()
            console.log(respuesta)
            if(metodo === "GET") leer(respuesta);
        }else if(peticion.status === 404){
            console.log("no found")
        }else if(peticion.status === 403){
            console.log("bloqueado parcero")
            location.href = "login.html"
        }else console.log("ni idea")
    }catch(e){
        console.log("manejado perro")
        console.log(e)
    }
}