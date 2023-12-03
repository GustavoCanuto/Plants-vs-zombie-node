let jogar = document.querySelector("[data-jogar]");

jogar.addEventListener("click", ()=>{

    let divEscolherJogador = document.querySelector("[data-EscolherJogador]");
 
    jogar.style.display ="none";
    sair.style.display ="block";
    divEscolherJogador.style.display = "flex";
}

);

let sair = document.querySelector("[data-sair]");

sair.addEventListener("click", ()=>{

    let main = document.querySelector("main");
    let divEscolherJogador = document.querySelector("[data-EscolherJogador]");
   
    jogar.style.display ="block";
    sair.style.display ="none";

    divEscolherJogador.style.display = "none";
}

);