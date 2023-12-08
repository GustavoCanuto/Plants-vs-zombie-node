// serverFunctionsPlants.js
function excluirUsuarioPlants(socketID, listaUsuariosPlants) {

    let indexPlant = listaUsuariosPlants.findIndex(user => user.socketID == socketID);

    if (indexPlant !== -1) {
        listaUsuariosPlants.splice(indexPlant, 1);
    }
}

function conectarUsuarioPlant(socket, data, listaUsuariosPlants, listaTodosUsuario) {
    
    data.ipMaquina = " 0 pontos ";
    
    listaUsuariosPlants.push(data);
    listaTodosUsuario.push(data);
   
    socket.broadcast.emit('receivePlant', data);
    socket.broadcast.emit('atualizarClicavel');
}

module.exports = { excluirUsuarioPlants, conectarUsuarioPlant };
