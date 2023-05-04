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
    if(list === 0) return;
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
        if(check.checked){
            h2.style.backgroundColor = "#6A8BF5";
            h3.style.backgroundColor = "#6A8BF5";
        }
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
            if(check.checked){
                h2.style.backgroundColor = "#6A8BF5";
                h3.style.backgroundColor = "#6A8BF5";
            }else{
                h2.style.backgroundColor = "#fff";
                h3.style.backgroundColor = "#fff";
            }
        })
        h2.addEventListener("keyup", () => {
           if(saveButton.className === "noGuardar") saveButton.classList.replace("noGuardar","guardar");
        })
        saveButton.addEventListener("click", () => {
            if(saveButton.className === "guardar"){
                let mensaje = {
                    "id" : item.id,
                    "realizado" : check.checked,
                    "hora" : h3.textContent,
                    "actividad" : h2.textContent,
                    "usuario" : null
                }
                sendPeticion("PUT",mensaje,0);
                saveButton.classList.replace("guardar","noGuardar");
            }
    })
    delButton.addEventListener("click", () =>{
        sendPeticion("DELETE",null,item.id);
    })
    });
    contenedor.appendChild(fragmento);
}
document.querySelector(".fin").addEventListener("click", () => {
    if(listaActividades === undefined) return;
    let count = 0;
    let total = listaActividades.length;
    console.log(count +" "+total)
    if(total != 0){
        for(actual of listaActividades){
            if(actual.realizado === true) count += 1;
        }
        console.log(count * 100/total)
        terminar(count,total);
    }
})
const terminar = (count,total) => {
    const modal =document.querySelector(".modal-fin");
    const contenedor = document.querySelector(".modal-contenedor")
    const fragmento = document.createDocumentFragment();
    const h2= document.createElement("H2")
    const h3 = document.createElement("H3");
    const finButton = document.createElement("BUTTON");
    let mensaje = "";
    let color = "";
    if(count/total < 0.34){ 
        mensaje = "No fue un dia muy productivo, pero seguro que mañana lo haras mejor"
        color = "rgb(243, 96, 96)";
    }else if(count/total < 0.7){
        mensaje = "Tuviste un buen dia pero se que puedes hacerlo mejor, sigue asi";
        color = "rgb(239, 227, 60)";
    }else{ 
        mensaje = "hoy fue un dia excelente, felicitaciones";
        color = "rgb(45, 198, 96)";
    }

    h2.textContent = `Has completado ${count}/${total} de tus actividades diarias`;
    h3.textContent = mensaje;
    h2.style.backgroundColor = color;
    finButton.classList = "delAll";
    finButton.textContent = "Terminar"
    fragmento.appendChild(h2);
    fragmento.appendChild(h3);
    fragmento.appendChild(finButton);
    modal.appendChild(fragmento);
    contenedor.style.display="flex";
    contenedor.style.animation = "final 1s forwards";

    finButton.addEventListener("click", () =>{
        console.log("hola")
        sendPeticion("DELETE",null,-1);
        window,location.reload();
    })
    
}