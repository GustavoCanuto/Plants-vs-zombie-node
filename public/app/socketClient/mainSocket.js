let socket = io('/home');


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
    $(`#${usuario}`).append("<br>&nbsp;&nbsp;&nbsp;&nbsp; (pendente)");
    
    }
  }

});

socket.on('receiveConvite', function (usuario) {
  renderConvite(usuario);
});

socket.on('convitePendente', function (usuarios) {

  $(`#${usuarios.id}`).addClass("block");
  $(`#${usuarios.usuarioConvidado}`).addClass("block");

  $(`#${usuarios.id}`).append("<br>&nbsp;&nbsp;&nbsp;&nbsp; (pendente)");
  $(`#${usuarios.usuarioConvidado}`).append("<br>&nbsp;&nbsp;&nbsp;&nbsp; (pendente)");

});

//cancela pendente
socket.on('cancelaPendente', function (usuarios) {
  
  $(`#${usuarios.id1}`).removeClass("block");
  $(`#${usuarios.id2}`).removeClass("block");

  let textoSemPendente1 = $(`#${usuarios.id1}`).text().replace(/\s*\(pendente\)/g, "");
  $(`#${usuarios.id1}`).text(textoSemPendente1);

  // Remover o texto " | [convite pendente]" do elemento com o ID 'usuarios.usuarioConvidado'
  let textoSemPendente2 = $(`#${usuarios.id2}`).text().replace(/\s*\(pendente\)/g, "");
  $(`#${usuarios.id2}`).text(textoSemPendente2);

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

  window.location.href = `game/public/index.html?sala=${sala}&lado=${lado}&cenario=${cenario}&nome=${nomeUsuario}` 

});

