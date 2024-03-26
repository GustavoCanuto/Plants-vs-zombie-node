let jogar = document.querySelector("[data-jogar]");
let sair = document.querySelector("[data-sair]");
let entrar = document.querySelector("[data-entrar]");
let retornarInicio = document.querySelectorAll("[data-retornarInicio]");
let buttonPlanta = document.querySelector("[data-buttonPlanta]");
let buttonZombie = document.querySelector("[data-buttonZombie]");

let divEscolherPersonagem = document.querySelector(".escolha");
let divGameLobby = document.querySelector("[data-gameLobby]");
let divNomeUsuario = document.querySelector("[data-nomeUsuario]")
let cenario = 0;
let ladoJogador = 0;

let main = document.querySelector("main");
const originalBackground = main.style.backgroundImage;

//desconectar volta para o inicio tela jogar
sair.addEventListener("click", () => {

    divGameLobby.classList.remove("aparecerTela");
    main.style.opacity = "0.8"
    jogar.style.opacity = "0"

    setTimeout(() => {

        jogar.style.display = "block";
        divGameLobby.style.display = "none";
        sair.style.display = "none";
        jogar.style.opacity = "0.3"

        setTimeout(() => {
            jogar.style.opacity = "1"
            main.style.opacity = "1"
        }, 20);
    }, 200);
});

//voltar Inicio tela jogar
retornarInicio.forEach(elemento => {
    elemento.addEventListener("click", () => {

        divNomeUsuario.classList.remove("aparecerTela");
        divEscolherPersonagem.classList.remove("aparecerTela");

        main.style.opacity = "0.8";
        jogar.style.opacity = "0";

        setTimeout(() => {
            jogar.style.display = "block";
            divNomeUsuario.style.display = "none";
            divEscolherPersonagem.style.display = "none";
            jogar.style.opacity = "0.3";

            setTimeout(() => {
                jogar.style.opacity = "1";
                main.style.opacity = "1";
            }, 20);
        }, 200);
    });
});

//manda para tela escolher nome usuario
jogar.addEventListener("click", () => {

    jogar.style.display = "none";
    divNomeUsuario.style.display = "flex";

    setTimeout(() => {
        divNomeUsuario.classList.add("aparecerTela");
    }, 10);

});

//manda para tela para Escolher Personagem
entrar.addEventListener("click", () => {
    divNomeUsuario.style.display = "none";
    divEscolherPersonagem.style.display = "flex";
    main.style.backgroundImage = "none";
    setTimeout(() => {
        divEscolherPersonagem.classList.add("aparecerTela");
    }, 10);
   
    setTimeout(() => {
        main.style.backgroundImage = originalBackground;
    }, 500);

});


//entrar na como planta
buttonPlanta.addEventListener("click", () => {
    loadingPersonalizado(0);
    entrarGameLobby()
});

//entrar na como zombie
buttonZombie.addEventListener("click", () => {
    loadingPersonalizado(1);
    entrarGameLobby();
});

function entrarGameLobby(){

    divEscolherPersonagem.classList.remove("aparecerTela");
    divEscolherPersonagem.style.display = "none";
    divGameLobby.style.display = "block";
    main.style.backgroundImage = "none";
    
    setTimeout(() => {
        divGameLobby.classList.add("aparecerTela");
        sair.style.display = "block";

        setTimeout(() => {
            main.style.backgroundImage = originalBackground;
        }, 50);

    }, 10);

}