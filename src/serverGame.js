export default function gameSocket(socket, salasAtivas, listaPontuacaoNavegador) {

  socket.on('iniciarSala', (sala, lado) => {

    let indicesEncontrados = [];
    let ladoValido = true;

    if (lado != 0 && lado != 1) {

      ladoValido = false;
    }

    if (!lado && !sala) {
      ladoValido = false;
    }

    salasAtivas.forEach((user, index) => {
      if (user.numeroSala === sala) {

        if (user.lado == lado) {

          ladoValido = false;
        }

        indicesEncontrados.push(index);

      }
    });



    if (indicesEncontrados.length <= 1 && ladoValido) {

      salasAtivas.push({ numeroSala: sala, lado: lado, socketID: socket.id })

      socket.join(sala);
      console.log(`Cliente lado ${lado} entrou na sala: ${sala}`);

      if (indicesEncontrados.length == 1) {
        setTimeout(() => {
          console.log("iniciando jogo")
          socket.emit('iniciarJogo')
          socket.to(sala).emit('iniciarJogo')
        }, 500);

      }

    } else {
      voltandoAoLobby();
    }
  }


  );

  //ao client se desconectar
  socket.on('disconnect', () => {



    let index = salasAtivas.findIndex(user => user.socketID == socket.id);

    if (index !== -1) {

      const sala = salasAtivas[index].numeroSala;


      salasAtivas.splice(index, 1);


      socket.to(sala).emit('usuarioDesconectador')

      let indexSala = salasAtivas.findIndex(user => user.numeroSala == sala);

      if (indexSala !== -1) {
        salasAtivas.splice(indexSala, 1);
      }

    }


  });

  function voltandoAoLobby() {
    console.log("sala ocupada, redirecionando para o lobby")
    socket.emit('voltandoAoLobby')
  }

  //conexao com o game 
  socket.on('criarAnimacao', (data) => {
    socket.to(data.sala).emit('fazerAnimacao', data)

  });

  //pontuacao
  socket.on('atualizaPontuacao', (lado, sala) => {
    socket.to(sala).emit('atualizaPontuacaoClient', lado)

  });

  socket.on('mouseMoveDentroDoTabuleiro', (data) => {
    socket.to(data.sala).emit('mouseMoveDentroDoTabuleiroClient', data)

  });

  socket.on('mouseEnterCelula', (data) => {
    socket.to(data.sala).emit('mouseEnterCelulaClient', data)

  });

  socket.on('navBarEnter', (data) => {
    socket.to(data.sala).emit('navBarEnterClient', data)

  });

  socket.on('wheelNavBar', (data) => {
    socket.to(data.sala).emit('wheelNavBarClient', data)

  });

  socket.on('dropPersonagem', (data) => {
    socket.to(data.sala).emit('dropPersonagemClient', data)

  });

  socket.on('movimentoTeclado', (targetCell, lado, chaveLado, sala) => {
    socket.to(sala).emit('movimentoTecladoClient', targetCell, lado, chaveLado)

  });

  socket.on('movimentoGamePad', (lado, analogMoveX, analogMoveY, sala) => {
    socket.to(sala).emit('movimentoGamePadClient', lado, analogMoveX, analogMoveY)

  });

  socket.on('centerImageGamePad', (lado, chaveLado, sala) => {
    socket.to(sala).emit('centerImageGamePadClient', lado, chaveLado)

  });


  socket.on('pontosParaOVencedor', (tokenUsuario) => {


    if (!tokenUsuario) {
      // Se não existe, cria um novo token
      tokenUsuario = "sessao" + socket.id.substr(0, 5) + Math.floor(100 + Math.random() * 900);

      // Salva o novo token no localStorage
      localStorage.setItem('tokenUsuario', tokenUsuario);


    }

    // Verifica se 'data.sessao' existe na listaPontuacaoNavegador
    if (listaPontuacaoNavegador[tokenUsuario]) {
      // Obtém o número de vitórias da listaPontuacaoNavegador
      listaPontuacaoNavegador[tokenUsuario] += 1;
    } else {

      listaPontuacaoNavegador[tokenUsuario] = 1; // ou outra lógica, dependendo do que você precisa
    }

  });


}
