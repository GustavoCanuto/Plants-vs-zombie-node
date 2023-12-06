// serverFunctionsZombies.js
function excluirUsuarioZombie(socket, listaUsuariosZombies) {
    let indexZombie = listaUsuariosZombies.findIndex(user => user.socketID == socket.id);

    if (indexZombie !== -1) {
        listaUsuariosZombies.splice(indexZombie, 1);
    }
}

function conectarUsuarioZombie(socket, data, listaUsuariosZombies, listaTodosUsuario) {
    let ipMaquina = socket.handshake.address;
    data.ipMaquina = ipMaquina;

    listaUsuariosZombies.push(data);
    listaTodosUsuario.push(data);
   
    socket.broadcast.emit('receiveZombie', data);
    socket.broadcast.emit('atualizarClicavel');
}

module.exports = { excluirUsuarioZombie, conectarUsuarioZombie };
