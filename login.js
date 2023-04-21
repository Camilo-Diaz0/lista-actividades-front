let failBoolean = false;
let bodyLogin = null;
const login = async() =>{
    const peticion = await fetch("http://localhost:8080/usuarios/autenticar",{
        method :"POST",
        headers :{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(bodyLogin)
        })
    if(peticion.ok){
        const respuesta = await peticion.text();
        console.log(respuesta);
    }else if(peticion.status === 400){
        document.querySelector(".noAlertUser").classList = "alertUser";
    }else console.log("error inesperado ")
        
}
document.querySelector(".login").addEventListener("click", x => {
    console.log("si me acuerdo");
    const usuario = document.querySelector(".username");
    const contraseña = document.querySelector(".password");
    if(failBoolean){
        usuario.style = `border: none;
        border-bottom: 1.2px solid rgba(172, 172, 172, 0.885);`;
        contraseña.style = `border: none;
        border-bottom: 1.2px solid rgba(172, 172, 172, 0.885);`;
        document.querySelector(".alert").classList = "noAlert";
        failBoolean = false;
    }
    if(usuario.value === "" || contraseña.value === ""){
        if(usuario.value === "" ) usuario.style.animation = "fail-input 1s forwards";
        else if(contraseña.value === "") contraseña.style.animation = "fail-input 1s forwards";
        failBoolean = true;
        document.querySelector(".noAlert").classList = "alert";
        return;
    }
    bodyLogin = {
            "username" : usuario.value,
            "password" : contraseña.value
        };
    console.log(bodyLogin);
    login();
    document.getElementById("form-login").reset();
})
document.querySelector(".create").addEventListener("click", x =>{
    location.href = "register.html";
})