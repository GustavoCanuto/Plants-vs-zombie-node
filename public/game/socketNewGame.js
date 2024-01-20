const socket2 = io('/game')

const parametros = new URLSearchParams(window.location.search);

let local = parametros.get('local');
let gamePadBloqueado = false;
let tecladoBloqueado = false;
let ladoJogador;
let sala; 
if(local == 'true') local = true;

if(!local){

sala = parametros.get('sala');
ladoJogador = parametros.get('lado');
local = false;
gamePadBloqueado = true;
tecladoBloqueado = true;

socket2.emit('iniciarSala', sala, ladoJogador)

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