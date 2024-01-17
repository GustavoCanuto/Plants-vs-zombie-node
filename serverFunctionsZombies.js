// serverFunctionsZombies.js
function excluirUsuarioZombie(socketID, listaUsuariosZombies) {
    let indexZombie = listaUsuariosZombies.findIndex(user => user.socketID == socketID);

    if (indexZombie !== -1) {
        listaUsuariosZombies.splice(indexZombie, 1);
    }
}

function conectarUsuarioZombie(socket, data, listaUsuariosZombies, listaTodosUsuario) {
 
    data.ipMaquina = " 0 pontos ";
    data.lado = 1;

    listaUsuariosZombies.push(data);
    listaTodosUsuario.push(data);
   
    socket.broadcast.emit('receiveZombie', data);
    socket.broadcast.emit('atualizarClicavel');
}

export { excluirUsuarioZombie, conectarUsuarioZombie };
