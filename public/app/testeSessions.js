
let jogar = document.querySelector("[data-jogar]");
let sair = document.querySelector("[data-sair]");
let entrar = document.querySelector("[data-entrar]");
let retornarInicio = document.querySelector("[data-retornarInicio]");
let usuario1 = document.querySelector("[data-messagem]");

let divEscolherPersonagem = document.querySelector(".escolha-personagem");
let buttonPlanta = document.querySelector("[data-buttonPlanta]");
let buttonZombie = document.querySelector("[data-buttonZombie]");


let divEscolherJogador = document.querySelector("[data-EscolherJogador]");
let divNomeUsuario = document.querySelector("[data-nomeUsuario]")

let main = document.querySelector("main");

usuario1.addEventListener("click", () => {

    socket.emit('messagemUsuario1');

});



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

//mostrar div escolher personagem
entrar.addEventListener("click", () => {

    divNomeUsuario.style.display = "none";

    divEscolherPersonagem.style.display = "flex";

});


//entrar na como planta
const originalBackground = main.style.backgroundImage;

buttonPlanta.addEventListener("click", () => {


    divEscolherPersonagem.style.display = "none";
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


//entrar na como zombie

buttonZombie.addEventListener("click", () => {


    divEscolherPersonagem.classList.remove("aparecerTela");
    divEscolherPersonagem.style.display = "none";
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


var elementosClicaveis = [];

function atualizarClicavel() {
    // Remove os ouvintes de evento antigos
    elementosClicaveis.forEach(function (elemento) {
        elemento.removeEventListener('click', elemento.clicavelHandler);
    });

    elementosClicaveis = document.querySelectorAll('.clicavel li');

    // Adiciona um ouvinte de evento a cada elemento li clicável
    elementosClicaveis.forEach(function (elemento) {
        // Verifica se o elemento já foi clicado
      // if (!elemento.clicado) {

            // Adicione aqui o código que você deseja executar quando o elemento for clicado
            elemento.clicavelHandler = function () {

                 if(elemento.classList.contains('block')){
                     alert("usuario com convite pendente! não é possivel enviar solicitação")
                 }
                else{

                //alert('Convite Enviado! Aguarde o retorno da solicitação ');
               
                let listaOrdenada = Array.from(elemento.parentNode.children).filter(e => e.tagName === "LI");
              
                let indice = listaOrdenada.indexOf(elemento);
                var numero = indice + 1;

               let partes = elemento.textContent.split('|');
               let nome = partes[0].trim();

                let conviteEnviado = `<p class="${elemento.id}xy ${elemento.id}" > Convite Enviado para <strong>${nome} </strong> (posição ${numero}) ! Aguarde o retorno <button class="cancelarConvite" style="color: red; font-size: 1vw; " onclick="cancelarPendente(this)">Cancelar</button> </p>`;

               $(`#mandadoSolitacao`).append(conviteEnviado);

             //   let convite = {quemConvidou: socket.id, convidado: elemento.id}

                socket.emit('convidarParaJogar', elemento.id);

         //       elemento.clicado = true; // Marca o elemento como clicado

             $(`#${elemento.id}`).closest('ol').removeClass("clicavel");

            atualizarClicavel();

                }

           };

            elemento.addEventListener('click', elemento.clicavelHandler);
      //  }
    });
}


   

//cancelar pendente 

function cancelarPendente(esse){

    let elementoPai = $(esse).closest('p');
    
    // Obtenha o id do elemento pai
    let idDoElementoPai = elementoPai.attr('class');

    let partes = idDoElementoPai.split(' ');
    let idPai  = partes[1].trim();

    let idSocket = socket.id;

    let elementosSeraoCancelado = {id1:idPai ,id2:idSocket}
    //alert(idPai +" "+idSocket);
   socket.emit('cancelarPendente', elementosSeraoCancelado);

   $(`.${idDoElementoPai}xy`).remove();
  
   $(`#${idPai}`).closest('ol').addClass("clicavel");
   atualizarClicavel();

}

//atualizar <p> pegar id e colocar o onclick