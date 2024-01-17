var socket = io('/home');

socket.on('atualizarClicavel', () => {
  atualizarClicavel();
});

socket.on('receivePlant', function (usuario) {
  renderPlant(usuario);
});

socket.on('receiveZombie', function (usuario) {
  renderZombie(usuario);
});

socket.on('receiveusuarioDisconnect', function (usuario) {
  renderusuarioDisconnect(usuario);
});

socket.on('previousPlants', function (listaUsuariosPlants) {
  for (usuario of listaUsuariosPlants) {
    renderPlant(usuario);
  }
});

socket.on('previousZombie', function (listaUsuariosZombies) {
  for (usuario of listaUsuariosZombies) {
    renderZombie(usuario);
  }
});

socket.on('previousPendentes', function (listaUsuariosConvitesPendentes) {
  for (usuario of listaUsuariosConvitesPendentes) {

    if($(`#${usuario}`)){

    $(`#${usuario}`).addClass("block");
    $(`#${usuario}`).append(" | [pendente]");
    
    }
  }

});

socket.on('receiveConvite', function (usuario) {
  renderConvite(usuario);
});

socket.on('convitePendente', function (usuarios) {

  $(`#${usuarios.id}`).addClass("block");
  $(`#${usuarios.usuarioConvidado}`).addClass("block");

  $(`#${usuarios.id}`).append(" | [pendente]");
  $(`#${usuarios.usuarioConvidado}`).append(" | [pendente]");

});

//cancela pendente
socket.on('cancelaPendente', function (usuarios) {
  
  $(`#${usuarios.id1}`).removeClass("block");
  $(`#${usuarios.id2}`).removeClass("block");

  // Remover o texto " | [convite pendente]" do elemento com o ID 'usuarios.id'
  $(`#${usuarios.id1}`).text($(`#${usuarios.id1}`).text().replace(" | [pendente]", ""));

  // Remover o texto " | [convite pendente]" do elemento com o ID 'usuarios.usuarioConvidado'
  $(`#${usuarios.id2}`).text($(`#${usuarios.id2}`).text().replace(" | [pendente]", ""));

  $(`.${usuarios.id1}xy`).remove();
  $(`.${usuarios.id2}xy`).remove();


});

//cancela pendente convite
socket.on('cancelaPendenteConvite', function (usuario) {

  $('.menssagens').css('display','none');
  $('.efeito').css('display','none');

  $(`#${usuario}`).closest('ol').addClass("clicavel");
  atualizarClicavel();

});

//gera tela de jogo (provisorio)
socket.on('telaJogo', (lado,sala)=>{

  window.location.href = `game/game.html?sala=${sala}&lado=${lado}`


  // let divAtual = document.querySelector("[data-gameLobby]");
  // let divJogando = document.querySelector(".jogando");

  // divAtual.style.display = "none"
  // divJogando.style.display = "flex"

  // var paragrafo = document.createElement("p");
  // // Adiciona texto ao parágrafo
  // var texto = document.createTextNode(`--- lado: ${data}`);
  // // Adiciona o nó de texto ao elemento <p>
  // paragrafo.appendChild(texto);
  // divJogando.appendChild(paragrafo);

});