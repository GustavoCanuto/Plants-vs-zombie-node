
const parametros = new URLSearchParams(window.location.search);


window.onload = function() {

inputNomeUsuario = parametros.get('nome');
let lado = parametros.get('lado');

 if(inputNomeUsuario && inputNomeUsuario.length<=11){

aguardarSocketId(function () {

jogar.style.display = "none";

if(lado==1){
  
  let usuario = gerarUsuario();

  socket.emit('pegarPontucaoZombie', usuario);

    loadingPersonalizado(1);
    entrarGameLobby()
  
}
else{
  let usuario = gerarUsuario();

  socket.emit('pegarPontucaoPlanta', usuario);

    loadingPersonalizado(0);
    entrarGameLobby()
}



});
}
}