let failBoolean = false;
let listaActividades;

const probar = ()=>{
    fetch("http://localhost:8080/api/pruebas")
        .then(res => {
            console.log(res);
        }).catch(e => console.log(e))
}

addEventListener("load", x => {
    let cookie = obtenerCookie();
    if(cookie !== ""){
        autHeader = cookie;
    }
    sendPeticion("GET",null,0);
    //probar();     
})
document.querySelector(".add-button").addEventListener("click", x =>{
    const formulario = document.querySelector(".add-form");
    if(failBoolean){
        document.querySelector(".alert").classList = "noAlert";
        failBoolean = false;
    }
    for(let i=1; i<4;i++){
        let actual = formulario.children[i]
        actual.style = ` border: none;
        border-bottom: 3px solid #c4caff;
        border-left: 2px solid #c4caff;`;
        if(actual.value === ""){
            alerta(1);
            actual.style.animation = "fail-input 1s forwards";
            return;
        }
    }
    let hora =ajustarHora(parseInt(formulario.children[1].value),parseInt(formulario.children[2].value))
    console.log(hora)
    if(hora === null){
        alerta(2);
        return;
    }
    let mensaje = {
        "realizado" : false,
        "hora" : hora,
        "actividad" : formulario.children[3].value,
        "usuario" : null
    }
    sendPeticion("POST",mensaje,0);
})
const ajustarHora = (hr,min) =>{
    if(hr >= 0 && min >= 0){
        if(hr <= 23 && min <= 59){
            if(hr < 10) hr = `0${hr}`;
            if(min < 10) min = `0${min}`;
            return `${hr}:${min}`;
        }
    }
    return null;
}
const alerta = (msj)=>{
    let content = "";
    if(msj === 1){
        content = "<span>!</span> Por favor complete todos los campos de la actividad:";
    }else if(msj === 2){
        content = "<span>!</span> El formato de la hora o minutos no es correcto:";
    }
    let alerta  = document.querySelector(".noAlert");
    alerta.innerHTML = content;
    alerta.classList = "alert";
    failBoolean = true;
}
const leer = (list) =>{
    const contenedor = document.querySelector(".container");
    contenedor.innerHTML = "";  
    let fragmento = document.createDocumentFragment();
    list.forEach(item => {
        const div = document.createElement("DIV");
        const check = document.createElement("INPUT");
        const h3 = document.createElement("H3");
        const h2 = document.createElement("H2");
        const saveButton = document.createElement("BUTTON");
        const delButton = document.createElement("BUTTON"); 

        div.classList.add("lista");
        saveButton.classList.add("noGuardar");
        delButton.classList.add("eliminar");
       
        check.setAttribute("type","checkbox");
        check.checked = item.realizado; 
        h2.setAttribute("contenteditable","true");
        h2.setAttribute("spellcheck","false")

        saveButton.textContent = "Guardar";
        delButton.textContent = "Eliminar";
        h3.textContent = item.hora;
        h2.textContent = item.actividad;

        div.appendChild(check)
        div.appendChild(h3)
        div.appendChild(h2)    
        div.appendChild(saveButton)
        div.appendChild(delButton)
        fragmento.appendChild(div);

        check.addEventListener("click", () => {
            if(saveButton.className === "noGuardar") saveButton.classList.replace("noGuardar","guardar");
        })
        h2.addEventListener("keyup", () => {
           if(saveButton.className === "noGuardar") saveButton.classList.replace("noGuardar","guardar");
        })
        saveButton.addEventListener("click", () => {
            console.log("hola")
            if(saveButton.className === "guardar"){
                console.log(check.checked)
                let mensaje = {
                    "id" : item.id,
                    "realizado" : check.checked,
                    "hora" : h3.textContent,
                    "actividad" : h2.textContent,
                    "usuario" : null
                }
                console.log(mensaje)
                sendPeticion("PUT",mensaje,0);
                saveButton.classList.replace("guardar","noGuardar");
            }
    })
    });
    contenedor.appendChild(fragmento);
}