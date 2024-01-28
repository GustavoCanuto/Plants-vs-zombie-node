let inputNomeUsuario;

//ao clicar no botao sair 
$('[data-sair]').on("click", (event) => {

  let socketIdUsuario = socket.id;

  renderusuarioDisconnect(socketIdUsuario);

  socket.emit('userDisconnect');

  $(".plants").removeClass("clicavel");
  $(".zombies").removeClass("clicavel");


  $('.menssagens').css('display', 'none');
  $('.efeito').css('display', 'none');

});

//ao clicar no entrar
$('[data-entrar]').on("click", (event) => {

  inputNomeUsuario = document.querySelector(".input-usuario").value;

});

//ao clicar no botao planta 
$('[data-buttonPlanta]').on("click", (event) => {

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

});



//ao clicar no botao zombie
$('[data-buttonZombie]').on("click", (event) => {

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

});

//criar um usuario
function gerarUsuario() {

  let nomeUsuario;

  if (inputNomeUsuario.trim() == "") {
    nomeUsuario = "Guest0" + Math.floor(100 + Math.random() * 900);

  } else {
    nomeUsuario = inputNomeUsuario;
  }


  let tokenUsuario = localStorage.getItem('tokenUsuario');

  if (!tokenUsuario) {
    // Se não existe, cria um novo token
    tokenUsuario = "sessao" + socket.id.substr(0, 5) + Math.floor(100 + Math.random() * 900);

    // Salva o novo token no localStorage
    localStorage.setItem('tokenUsuario', tokenUsuario);
  } else {
    // Se já existe, você pode simplesmente usar o token existente
    console.log("Token existente:", tokenUsuario);
  }


  let socketIdUsuario = socket.id;

  let usuario = {
    nome: nomeUsuario,
    sessao: tokenUsuario,
    socketID: socketIdUsuario
  };

  usuario.ipMaquina = "x";

  return usuario;
}

//pega posicao na lista
function posicaoLista(elemento) {

  var li = document.getElementById(elemento.socketID);
  let listaOrdenada = Array.from(li.parentNode.children).filter(e => e.tagName === "LI");

  let indice = listaOrdenada.indexOf(li);
  var numero = indice + 1;

  return numero;
}