document.querySelector(".login").addEventListener("click", x => {
    console.log("si me acuerdo");
    const usuario = document.querySelector(".username").value;
    const contraseña = document.querySelector(".password").value;
    let body = `
        {
            username : ${usuario},
            password : ${contraseña}
        }
    `;
    console.log(body);

    document.getElementById("form-login").reset();
})
document.querySelector(".create").addEventListener("click", x =>{
    location.href = "register.html";
})

document.querySelector(".register").addEventListener("click", x => {
    console.log("Holo");
})