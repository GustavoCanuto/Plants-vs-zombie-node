
// let divEscolherPersonagem = document.querySelector(".escolha");
// let divNomeUsuario = document.querySelector("[data-nomeUsuario]")

const parametros = new URLSearchParams(window.location.search);


window.onload = function() {

inputNomeUsuario = parametros.get('nome');
let lado = parametros.get('lado');

 if(inputNomeUsuario && inputNomeUsuario.length<=11){

aguardarSocketId(function () {

jogar.style.display = "none";

if(lado==1){
  
    let usuario = gerarUsuario();
    socket.emit('pegarPontucao', usuario);
  
    socket.on('receberPontuacao', (numeroVitorias) => {
  
      usuario.numeroVitorias = numeroVitorias;
      renderZombie(usuario);
  
      let numero = posicaoLista(usuario);
  
      $(".informacaoParaUsuario-infoUser").text(usuario.nome);
      $(".plants").addClass("clicavel");
  
      usuario.posicao = numero;
  
      socket.emit('zombieConnected', usuario,numeroVitorias);
  
      nomeUsuario = usuario.nome;
  
      atualizarClicavel();
  
    });

    loadingPersonalizado(0);
    entrarGameLobby()
  
}
else{
    let usuario = gerarUsuario();

    socket.emit('pegarPontucao', usuario);
  
    socket.on('receberPontuacao', (numeroVitorias) => {
  
      usuario.numeroVitorias = numeroVitorias;
      renderPlant(usuario);
    
      let numero = posicaoLista(usuario);
    
      $(".informacaoParaUsuario-infoUser").text(usuario.nome);
      $(".zombies").addClass("clicavel");
    
      usuario.posicao = numero;
    
      socket.emit('plantConnected', usuario, numeroVitorias);
    
    
      nomeUsuario = usuario.nome;
    
      atualizarClicavel();
    
    });

    loadingPersonalizado(0);
    entrarGameLobby()
}



});
}
}