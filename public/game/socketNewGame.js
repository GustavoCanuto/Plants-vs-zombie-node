const socket2 = io('/game')

const parametros = new URLSearchParams(window.location.search);
const sala = parametros.get('sala');
const ladoJogador = parametros.get('lado');
let local = true;
let gamePadBloqueado = true;
let tecladoBloqueado = true;

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