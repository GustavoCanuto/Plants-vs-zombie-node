// serverFunctionsZombies.js
function excluirUsuarioZombie(socketID, listaUsuariosZombies) {
    let indexZombie = listaUsuariosZombies.findIndex(user => user.socketID == socketID);

    if (indexZombie !== -1) {
        listaUsuariosZombies.splice(indexZombie, 1);
    }
}

function conectarUsuarioZombie(socket, data, listaUsuariosZombies, listaTodosUsuario, numeroVitorias) {

    data.ipMaquina = "MaiorQue3"
    data.numeroVitorias = numeroVitorias;
    data.lado = 1;

    listaUsuariosZombies.push(data);
    listaTodosUsuario.push(data);

    socket.broadcast.emit('receiveZombie', data);
    socket.broadcast.emit('atualizarClicavel');
}

export { excluirUsuarioZombie, conectarUsuarioZombie };
