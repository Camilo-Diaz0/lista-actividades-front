

const probar = ()=>{
    fetch("http://localhost:8080/api/pruebas")
        .then(res => {
            console.log(res);
        }).catch(e => console.log(e))
}
const getDatos = ()=>{
    fetch("http://localhost:8080/api/actividades")
        .then(res => {
            if(res.ok){
                console.log("hola");
                Promise.resolve(res);
            }else{
                Promise.reject(res);
            }
        }).catch(e => {
            console.log(e);
            console.log("su puta madre hijo de puta");
            location.href ="login.html";
        })
}

addEventListener("load", x => {
    console.log("holaaaa")
    getDatos();
    // probar();     
})