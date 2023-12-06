let inputNomeUsuario;

//ao clicar no botao sair pegar o id e renderiza na lista e manda para o server disconnect
$('[data-sair]').on("click", (event) => {

  let socketIdUsuario = socket.id;

  renderMessageDisconnect(socketIdUsuario);

  socket.emit('userDisconnect');

  $(".plants").removeClass("clicavel");
  $(".zombies").removeClass("clicavel");

});

//ao clicar no botao planta pegar o nomeUsuario e renderiza na lista e manda para o server jogar na array
$('[data-entrar]').on("click", (event) => {

  inputNomeUsuario = document.querySelector(".input-usuario").value;

});

//ao clicar no botao planta pegar o nomeUsuario e renderiza na lista e manda para o server jogar na array
$('[data-buttonPlanta]').on("click", (event) => {

  let usuario = gerarUsuario();

  renderPlant(usuario);

  $(".informacaoParaUsuario-infoUser").text("Olá, " + usuario.nome);

  $(".zombies").addClass("clicavel");

  socket.emit('plantConnected', usuario);

  atualizarClicavel();

});


//ao clicar no botao zombie pegar o nomeUsuario e renderiza na lista e manda para o server jogar na array
$('[data-buttonZombie]').on("click", (event) => {

  let usuario = gerarUsuario();

  renderZombie(usuario);

  $(".informacaoParaUsuario-infoUser").text("Olá, " + usuario.nome);

  $(".plants").addClass("clicavel");

  socket.emit('zombieConnected', usuario);

  atualizarClicavel();

});

function gerarUsuario() {

      let nomeUsuario;

        if (inputNomeUsuario.trim() == "") {
         nomeUsuario = "Guest0" + Math.floor(1000000 + Math.random() * 9000000);

         } else {
         nomeUsuario = inputNomeUsuario;
        }

        let sessaoUsuario = "sessao" + socket.id.substr(0, 5);
        let socketIdUsuario = socket.id;

        let usuario = {
        nome: nomeUsuario,
        sessao: sessaoUsuario,
        socketID: socketIdUsuario
       };

     usuario.ipMaquina = "x";

     return usuario;
}