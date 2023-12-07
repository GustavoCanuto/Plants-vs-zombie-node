var socket = io('127.0.0.1:3000');

//pega nome client que clicou no botao jogar e atualizar li para todos clients 
socket.on('oi', () => {
  let message = $("#oi");
  message.text("alguem clicou no botao de mensagem no momento que vc era o ultimo usuario conectado");

});


socket.on('atualizarClicavel', () => {
  atualizarClicavel();
});

//pega nome client que clicou no botao jogar e atualizar li para todos clients 
socket.on('receivePlant', function (message) {
  renderPlant(message);

});


//pega nome client que clicou no botao jogar e atualizar li para todos clients 
socket.on('receiveZombie', function (message) {
  renderZombie(message);

});

//pega nome client que clicou desconectou e atualizar li para todos  clients 
socket.on('receiveMessageDisconnect', function (message) {
  renderMessageDisconnect(message);

});

//ao entrar na pagina carregar lista de usuarios
socket.on('previousPlants', function (listaUsuariosPlants) {
  for (message of listaUsuariosPlants) {
    renderPlant(message);
  }

});

//ao entrar na pagina carregar lista de usuarios
socket.on('previousZombie', function (listaUsuariosZombies) {
  for (message of listaUsuariosZombies) {
    renderZombie(message);
  }

});


//ao entrar atualizar usuarios pendentes
socket.on('previousPendentes', function (listaUsuariosConvitesPendentes) {
  for (usuario of listaUsuariosConvitesPendentes) {
    $(`#${usuario}`).addClass("block");
    $(`#${usuario}`).append(" | [convite pendente]");
  }

});

//receber convite
socket.on('receiveConvite', function (usuario) {

  renderConvite(usuario);

 

});

socket.on('convitePendente', function (usuarios) {

  $(`#${usuarios.id}`).addClass("block");
  $(`#${usuarios.usuarioConvidado}`).addClass("block");

  $(`#${usuarios.id}`).append(" | [convite pendente]");
  $(`#${usuarios.usuarioConvidado}`).append(" | [convite pendente]");



});


//cancela pendente
socket.on('cancelaPendente', function (usuarios) {
   //alert(usuarios.id1+"----"+usuarios.id2);

  $(`#${usuarios.id1}`).removeClass("block");
  $(`#${usuarios.id2}`).removeClass("block");

  // Remover o texto " | [convite pendente]" do elemento com o ID 'usuarios.id'
  $(`#${usuarios.id1}`).text($(`#${usuarios.id1}`).text().replace(" | [convite pendente]", ""));

  // Remover o texto " | [convite pendente]" do elemento com o ID 'usuarios.usuarioConvidado'
  $(`#${usuarios.id2}`).text($(`#${usuarios.id2}`).text().replace(" | [convite pendente]", ""));

  $(`.${usuarios.id1}xy`).remove();
  $(`.${usuarios.id2}xy`).remove();



});

//cancela pendente convite
socket.on('cancelaPendenteConvite', function (usuario) {
  //alert(usuarios.id1+"----"+usuarios.id2);


  $(`#${usuario}`).closest('ol').addClass("clicavel");
  atualizarClicavel();

});