document.querySelector(".register").addEventListener("click", x => {
    
    console.log("hola");
    const input = document.querySelector(".form-register");
    console.log(input.children[0]) ;
    for(let actual of input.children){
        actual.style = `border: none;
        border-bottom: 1.2px solid rgba(172, 172, 172, 0.885);`;
        if(actual.value === ""){
            console.log("error");
            document.querySelector(".noAlert").classList = "alert";
            actual.style.animation = "fail-input 1s forwards";
            return;
        }
    }
    document.querySelector(".alert").classList = "noAlert";
    input.reset();

})