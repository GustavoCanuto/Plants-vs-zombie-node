function excluirUsuarioListaTodosUsuarios(socketID, listaTodosUsuario) {

    let index = listaTodosUsuario.findIndex(user => user.socketID == socketID);

    if (index !== -1) {
        listaTodosUsuario.splice(index, 1);
    }

}

function excluirConvitePendente(socketID, listaUsuariosConvitesPendentes){

    let index = listaUsuariosConvitesPendentes.findIndex(user => user == socketID);

    if (index !== -1) {
        listaUsuariosConvitesPendentes.splice(index, 1);
    }

}

export { excluirUsuarioListaTodosUsuarios, excluirConvitePendente };