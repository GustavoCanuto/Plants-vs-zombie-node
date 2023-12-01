let jogar = document.querySelector("[data-jogar]");

jogar.addEventListener("click", ()=>{

    let main = document.querySelector("main");
    let divEscolherJogador = document.querySelector("[data-EscolherJogador]");
    main.style.backgroundImage = "none";
    main.style.backgroundColor = "#FFFFFF";
    jogar.style.display ="none";
    divEscolherJogador.style.display = "flex";
}

);