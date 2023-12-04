
    let jogar = document.querySelector("[data-jogar]");
    let sair = document.querySelector("[data-sair]");
    let entrar = document.querySelector("[data-entrar]");
    let retornarInicio = document.querySelector("[data-retornarInicio]");

    

    let divEscolherJogador = document.querySelector("[data-EscolherJogador]");
    let divNomeUsuario = document.querySelector("[data-nomeUsuario]")

    let main = document.querySelector("main");
  


//desconectar
sair.addEventListener("click", () => {
     
    divEscolherJogador.classList.remove("aparecerTela");
    main.style.opacity = "0.8"
    jogar.style.opacity = "0"
     
    setTimeout(() => {
        
        jogar.style.display = "block";
        divEscolherJogador.style.display = "none"; 
        sair.style.display = "none";
        jogar.style.opacity = "0.3"

        setTimeout(() => {
        
     
        jogar.style.opacity = "1"
         main.style.opacity = "1"

        }, 20);

    }, 200);


});

//voltar Inicio tela nome de usuario

retornarInicio.addEventListener("click", () => {
     
    divNomeUsuario.classList.remove("aparecerTela");
    main.style.opacity = "0.8"
    jogar.style.opacity = "0"
     
    setTimeout(() => {
        
        jogar.style.display = "block";
        divNomeUsuario.style.display = "none"; 
        jogar.style.opacity = "0.3"

        setTimeout(() => {
        
     
        jogar.style.opacity = "1"
         main.style.opacity = "1"

        }, 20);

    }, 200);


});


//novo usuario 

jogar.addEventListener("click", () => {

    jogar.style.display = "none";
 
    divNomeUsuario.style.display = "flex";
   
    setTimeout(() => {
        
        divNomeUsuario.classList.add("aparecerTela");
  
    }, 10);

    });


//entrar na sala 
const originalBackground = main.style.backgroundImage;

entrar.addEventListener("click", () => {

  
    divNomeUsuario.classList.remove("aparecerTela");
    divNomeUsuario.style.display = "none";
    divEscolherJogador.style.display = "flex";
    main.style.backgroundImage = "none";
    setTimeout(() => {
        divEscolherJogador.classList.add("aparecerTela");
        sair.style.display = "block";
        
        setTimeout(() => {
        main.style.backgroundImage = originalBackground;
        }, 500);
    
    }, 10);
  
   

});




//quando usuario já conectado entrar direto na sala

// jogar.addEventListener("click", () => {

//     jogar.style.display = "none";
//     sair.style.display = "block";
//     divEscolherJogador.style.display = "flex";
   
//     setTimeout(() => {
        
//         divEscolherJogador.classList.add("aparecerTela");
  
//     }, 10);

//     });