let failBoolean = false;
let bodyRegister = null;

const register = (bodyRegister) =>{
    fetch("https://lista-actividades.onrender.com/usuarios/crear",{
        method :"POST",
        headers :{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(bodyRegister)
         })
        .then(res => {
            console.log(res.status)
            if(res.ok){
                location.href = "login.html";
            }else if(res.status == 400){
                document.querySelector(".uniqueNoAlert").classList = "uniqueAlert";
                console.log(document.querySelector(".form-register").firstElementChild);
                document.querySelector(".form-register").firstElementChild.style.animation = "fail-input 1s forwards";
            }
        })
}
document.querySelector(".register").addEventListener("click", x => {
    const input = document.querySelector(".form-register");
    if(failBoolean){
        document.querySelector(".alert").classList = "noAlert";
        failBoolean = false;
    }
    for(let actual of input.children){
        actual.style = `border: none;
        border-bottom: 1.2px solid rgba(172, 172, 172, 0.885);`;
        if(actual.value === ""){
            failBoolean = true;
            document.querySelector(".noAlert").classList = "alert";
            actual.style.animation = "fail-input 1s forwards";
            return;
        }
    }
    bodyRegister ={
    "username" : input.children[0].value,
    "edad" : parseInt(input.children[1].value),
    "correo" : input.children[2].value,
    "password" : input.children[3].value,
    "roles" : "ROLE_USER",
    "actividades" :  null
    }
    register(bodyRegister);
})
