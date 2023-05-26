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
const sendPeticion = async(metodo,mensaje,id) => {
    let url = "https://lista-actividades.onrender.com/api/actividades";
    if(metodo === "DELETE" && id != -1) url = `https://lista-actividades.onrender.com/api/actividades/${id}`;
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
            if(metodo === "GET") {
                let respuesta = await peticion.json()
                let listOrden = ordernar(respuesta);
                leer(listOrden);
            }
            else sendPeticion("GET",null,0);
        }else if(peticion.status === 404){
            console.log("no found")
            if(metodo === "GET") leer(0);
        }else if(peticion.status === 403){
            console.log("bloqueado parcero")
            location.href = "login.html"
        }else console.log("ni idea")
    }catch(e){
        console.log("capturando el error")
        console.log(e)
    }
}
const ordernar = (res) =>{
    for (let i = 0; i < res.length;i++){
        for(let j = i+1; j < (res.length);j++){
            let horai = parseInt(res[i].hora.substring(0,2));
            let horaj = parseInt(res[j].hora.substring(0,2));
            let aux;
            if(horai > horaj){
                aux = res[i];
                res[i] = res[j];
                res[j] = aux;
            }else if(horai === horaj){
                horai = parseInt(res[i].hora.substring(3,5));
                horaj = parseInt(res[j].hora.substring(3,5));
                if(horai > horaj){
                    aux = res[i];
                    res[i] = res[j];
                    res[j] = aux;
                }
            }
        }
    }
    listaActividades = res;
    return listaActividades;
}