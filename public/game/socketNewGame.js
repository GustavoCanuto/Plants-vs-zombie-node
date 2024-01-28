const socket2 = io('/game')

const parametros = new URLSearchParams(window.location.search);

let local = parametros.get('local');
let cenario = parametros.get('cenario');

let nome = parametros.get('nome');
let ladoJogador = parametros.get('lado');
let gamePadBloqueado = false;
let tecladoBloqueado = false;
let sala; 
if(local == 'true') local = true;



if(!local){

sala = parametros.get('sala');
local = false;
gamePadBloqueado = true;
tecladoBloqueado = true;

socket2.on('voltandoAoLobby', () => {
    window.location.href = `/`
});


socket2.on('usuarioDesconectador', () => {
    alert("usuario desconectou você ganhou")
    window.location.href = `/`
});



window.onload = function() {

    $(".carregamento").css("display", "flex"); 
    $(".contagemJogo").css("display", "none");
   

 
};

}

loadingPersonalizado(ladoJogador)