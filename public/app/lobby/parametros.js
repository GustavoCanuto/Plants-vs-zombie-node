
// let divEscolherPersonagem = document.querySelector(".escolha");
// let divNomeUsuario = document.querySelector("[data-nomeUsuario]")

const parametros = new URLSearchParams(window.location.search);


window.onload = function() {

inputNomeUsuario = parametros.get('nome');
let lado = parametros.get('lado');

 if(inputNomeUsuario){

aguardarSocketId(function () {

jogar.style.display = "none";
//entrar na como planta
if(lado==1){
    let usuario = gerarUsuario();
  
    renderZombie(usuario);
  
    let numero = posicaoLista(usuario);
  
    $(".informacaoParaUsuario-infoUser").text(usuario.nome);
    $(".plants").addClass("clicavel");
  
    usuario.posicao = numero;
  
    socket.emit('zombieConnected', usuario);
  
    nomeUsuario = usuario.nome;
  
    atualizarClicavel();

    loadingPersonalizado(1);
    entrarGameLobby()
}
else{
    let usuario = gerarUsuario();
  
    renderPlant(usuario);
  
    let numero = posicaoLista(usuario);
  
    $(".informacaoParaUsuario-infoUser").text(usuario.nome);
    $(".zombies").addClass("clicavel");
  
    usuario.posicao = numero;
  
    socket.emit('plantConnected', usuario);
    
    nomeUsuario = usuario.nome;
    
    atualizarClicavel();

    loadingPersonalizado(0);
    entrarGameLobby()
}



});
    }
}