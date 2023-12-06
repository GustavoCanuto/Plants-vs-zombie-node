var socket = io('localhost:3000');

    //cria iten na lista
    function renderMessage(message) {
      let clienteLista = document.createElement("li");
      clienteLista.textContent = message.nome + " | IP máquina: " + (message.ipMaquina).substring(7);
      clienteLista.id = message.socketID;
      $(".lista-conectados").append(clienteLista);

    }

    //retirar usuario desconectado da Lista 
    function renderMessageDisconnect(message) {

      let liParaRemover = $("#" + message);
      // let liParaRemover = $(".lista-conectados li:contains('" + message + "')");

      liParaRemover.remove();
    }

     //pega nome client que clicou no botao jogar e atualizar li para todos clients 
     socket.on('oi',  () => {
      let message= $("#oi");
      message.text("alguem clicou no botao de mensagem no momento que vc era o ultimo usuario conectado");
      
    });

    //pega nome client que clicou no botao jogar e atualizar li para todos clients 
    socket.on('receiveMessage', function (message) {
      renderMessage(message);
    });

    //pega nome client que clicou desconectou e atualizar li para todos clients 
    socket.on('receiveMessageDisconnect', function (message) {
      renderMessageDisconnect(message);
    });

    //ao entrar na pagina carregar lista de usuarios
    socket.on('previousMessages', function (listaUsuariosConectados) {
      for (message of listaUsuariosConectados) {
        renderMessage(message);
      }
    });


    //ao clicar no botao sair pegar o id e renderiza na lista e manda para o server disconnect
    $('[data-sair]').on("click", (event) => {

      let socketIdUsuario = socket.id;

      renderMessageDisconnect(socketIdUsuario);

      socket.emit('userDisconnect', socketIdUsuario);

    });



    //ao clicar no botao ENTRAR pegar o nomeUsuario e renderiza na lista e manda para o server jogar na array
    $('[data-entrar]').on("click", (event) => {

      let inputNomeUsuario = document.querySelector(".input-usuario").value;

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

      // renderMessage(usuario);

      socket.emit('userConnected', usuario);
    });
