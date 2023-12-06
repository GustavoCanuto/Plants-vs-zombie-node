// serverFunctionsPlants.js
function excluirUsuarioPlants(socket, listaUsuariosPlants) {
    let indexPlant = listaUsuariosPlants.findIndex(user => user.socketID == socket.id);

    if (indexPlant !== -1) {
        listaUsuariosPlants.splice(indexPlant, 1);
    }
}

function conectarUsuarioPlant(socket, data, listaUsuariosPlants, listaTodosUsuario) {
    let ipMaquina = socket.handshake.address;
    data.ipMaquina = ipMaquina;

    listaUsuariosPlants.push(data);
    listaTodosUsuario.push(data);
   
    socket.broadcast.emit('receivePlant', data);
    socket.broadcast.emit('atualizarClicavel');
}

module.exports = { excluirUsuarioPlants, conectarUsuarioPlant };
