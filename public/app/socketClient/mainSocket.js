var socket = io('127.0.0.1:3000');

//pega nome client que clicou no botao jogar e atualizar li para todos clients 
socket.on('oi', () => {
  let message = $("#oi");
  message.text("alguem clicou no botao de mensagem no momento que vc era o ultimo usuario conectado");

});


socket.on('atualizarClicavel', () =>{
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




//pega nome client que clicou desconectou e atualizar li para todos clients 
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

