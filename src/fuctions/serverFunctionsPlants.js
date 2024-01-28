// serverFunctionsPlants.js
function excluirUsuarioPlants(socketID, listaUsuariosPlants) {

    let indexPlant = listaUsuariosPlants.findIndex(user => user.socketID == socketID);

    if (indexPlant !== -1) {
        listaUsuariosPlants.splice(indexPlant, 1);
    }
}

function conectarUsuarioPlant(socket, data, listaUsuariosPlants, listaTodosUsuario,numeroVitorias) {
    
    data.ipMaquina = "MaiorQue3"
    data.numeroVitorias = numeroVitorias;
    data.lado = 0;
    listaUsuariosPlants.push(data);
    listaTodosUsuario.push(data);
   
    socket.broadcast.emit('receivePlant', data);

    socket.broadcast.emit('atualizarClicavel');
}

export  { excluirUsuarioPlants, conectarUsuarioPlant };
