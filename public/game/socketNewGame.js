const socket2 = io('/game')

const parametros = new URLSearchParams(window.location.search);

let vitoria = false;
 
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
    if(!vitoria){
        $(".messagemCarregamento").css("height", "17%"); 
        $(".messagemCarregamento").css("width", "65%"); 
        $(".contagemJogo").css("display", "none");
        $('.textoVitoria').text("Usuario desconectou, Você Ganhou!");
        $(".btnVoltarLobby").css("display", "block");
        $(".carregamento").css("backgroundColor", " rgba(8, 8, 8, 0.61)");
         $(".carregamento").css("display", "flex"); 
         $(".messagemCarregamento").css("display", "flex"); 
         vitoria = true;
         let tokenUsuario = localStorage.getItem('tokenUsuario');
         socket2.emit('pontosParaOVencedor', tokenUsuario)
       }
});

window.onload = function() {

    $(".carregamento").css("display", "flex"); 
    $(".contagemJogo").css("display", "none");
   
};

}

loadingPersonalizado(ladoJogador)