//export default io;eren
import  io  from "./server.js";
import  gameSocket from "./serverGame.js";
import { excluirUsuarioPlants, conectarUsuarioPlant } from './fuctions/serverFunctionsPlants.js';
import { excluirUsuarioZombie, conectarUsuarioZombie } from './fuctions/serverFunctionsZombies.js';
import { excluirUsuarioListaTodosUsuarios, excluirConvitePendente } from './fuctions/serverFunctionsGeral.js';

const home = io.of('/home')

var listaTodosUsuario = [];
var listaUsuariosPlants = [];
var listaUsuariosZombies = [];
var listaUsuariosConvitesPendentes = [];
var listaUsuariosDupla = [{ PlayerConvidou: 0, PlayerConvidado: 0 }];
var salaContador = 0;

// ao client se conectar
home.on('connection', socket => {
    console.log("conectado home")
    //mandar historico
    socket.emit('previousPlants', listaUsuariosPlants);
    socket.emit('previousZombie', listaUsuariosZombies);
    socket.emit('previousPendentes', listaUsuariosConvitesPendentes);

    //açao para quando planta se conectar
    socket.on('plantConnected', (data) => {
        conectarUsuarioPlant(socket, data, listaUsuariosPlants, listaTodosUsuario);
    })

    //açao para quando zombie se conectar
    socket.on('zombieConnected', (data) => {
        conectarUsuarioZombie(socket, data, listaUsuariosZombies, listaTodosUsuario);
    })

    //cancelar pendente   
    socket.on('cancelarPendente', (usuarios) => {

        excluirConvitePendente(usuarios.id1, listaUsuariosConvitesPendentes);
        excluirConvitePendente(usuarios.id2, listaUsuariosConvitesPendentes);

        //cancela para todos conectados o pendente
        socket.broadcast.emit("cancelaPendente", usuarios);
        socket.emit("cancelaPendente", usuarios);

        //manda para o usuario resposta 
        socket.to(usuarios.id1).emit("cancelaPendenteConvite", usuarios.id2);

    });

    //aceitar convite 
    socket.on('aceitarConvite', (usuarios) => {

        let player1 = encontraLadoZombie(usuarios.id1)
        let player2 = encontraLadoZombie(usuarios.id2)

        desconectarUsuario(usuarios.id1);
        desconectarUsuario(usuarios.id2);

        socket.broadcast.emit('receiveusuarioDisconnect', usuarios.id1)
        socket.broadcast.emit('receiveusuarioDisconnect', usuarios.id2)

        const numeroSala = ++salaContador;

        socket.to(usuarios.id1).emit('telaJogo', player1, numeroSala);
        socket.emit('telaJogo', player2, numeroSala);

    });

    //convidar usuario para jogar
    socket.on('convidarParaJogar', (usuarioConvidado) => {

        let quemConvidou = listaTodosUsuario.find(user => user.socketID == socket.id);

        let infoConvite = { nome: quemConvidou.nome, id: quemConvidou.socketID, posicao: quemConvidou.posicao, usuarioConvidado: usuarioConvidado }

        socket.to(usuarioConvidado).emit("receiveConvite", infoConvite);
        socket.broadcast.emit('convitePendente', infoConvite)
        socket.emit('convitePendente', infoConvite);

        listaUsuariosConvitesPendentes.push(socket.id);
        listaUsuariosConvitesPendentes.push(usuarioConvidado);
        listaUsuariosDupla.push({ PlayerConvidou: socket.id, PlayerConvidado: usuarioConvidado })
    });

    //ao clicar em sair
    socket.on('userDisconnect', () => {

        let indiceEncontrado;
        let id1;
        let id2;

        indiceEncontrado = listaUsuariosDupla.findIndex(item =>
            item.PlayerConvidou == socket.id
        );

        if (indiceEncontrado !== -1) {

            id1 = listaUsuariosDupla[indiceEncontrado].PlayerConvidado;

        } else {

            indiceEncontrado = listaUsuariosDupla.findIndex(item =>
                item.PlayerConvidado == socket.id
            );

            if (indiceEncontrado !== -1) {

                id1 = listaUsuariosDupla[indiceEncontrado].PlayerConvidou;

            }

        }

        id2 = socket.id;
        if (indiceEncontrado !== -1) {

            let usuarios = { id1: id1, id2: id2 }

            //  socket.emit('cancelaPendenteConviteDisconect', usuarios)

            excluirConvitePendente(usuarios.id1, listaUsuariosConvitesPendentes);
            excluirConvitePendente(usuarios.id2, listaUsuariosConvitesPendentes);

            //cancela para todos conectados o pendente
            socket.broadcast.emit("cancelaPendente", usuarios);
            socket.emit("cancelaPendente", usuarios);

            //manda para o usuario resposta 
            socket.to(id1).emit("cancelaPendenteConvite", id2);


            //
            listaUsuariosDupla.splice(indiceEncontrado, 1);

        }

        socket.broadcast.emit('receiveusuarioDisconnect', socket.id)
        desconectarUsuario(socket.id);
    });

    //ao client se desconectar
    socket.on('disconnect', () => {


        let indiceEncontrado;
        let id1;
        let id2;

        indiceEncontrado = listaUsuariosDupla.findIndex(item =>
            item.PlayerConvidou == socket.id
        );

        if (indiceEncontrado !== -1) {

            id1 = listaUsuariosDupla[indiceEncontrado].PlayerConvidado;

        } else {

            indiceEncontrado = listaUsuariosDupla.findIndex(item =>
                item.PlayerConvidado == socket.id
            );

            if (indiceEncontrado !== -1) {

                id1 = listaUsuariosDupla[indiceEncontrado].PlayerConvidou;

            }

        }

        id2 = socket.id;
        if (indiceEncontrado !== -1) {

            let usuarios = { id1: id1, id2: id2 }

            //  socket.emit('cancelaPendenteConviteDisconect', usuarios)

            excluirConvitePendente(usuarios.id1, listaUsuariosConvitesPendentes);
            excluirConvitePendente(usuarios.id2, listaUsuariosConvitesPendentes);

            //cancela para todos conectados o pendente
            socket.broadcast.emit("cancelaPendente", usuarios);
            socket.emit("cancelaPendente", usuarios);

            //manda para o usuario resposta 
            socket.to(id1).emit("cancelaPendenteConvite", id2);


            //
            listaUsuariosDupla.splice(indiceEncontrado, 1);

        }

        socket.broadcast.emit('receiveusuarioDisconnect', socket.id)
        desconectarUsuario(socket.id);

    });


});

function desconectarUsuario(socketID) {

    excluirUsuarioPlants(socketID, listaUsuariosPlants);
    excluirUsuarioZombie(socketID, listaUsuariosZombies);
    excluirUsuarioListaTodosUsuarios(socketID, listaTodosUsuario);

}

function encontraLadoZombie(id) {
    let indexPlant = listaUsuariosPlants.findIndex(user => user.socketID == id);

    if (indexPlant !== -1) {

        return listaUsuariosPlants[indexPlant].lado
    }

    let indexZombie = listaUsuariosZombies.findIndex(user => user.socketID == id);

    if (indexZombie !== -1) {


        return listaUsuariosZombies[indexZombie].lado
    }


}

//verficar lista atualizada de usuarios
function testeConsole() {
    console.log("todos usuarios: " + listaTodosUsuario)
    console.log("plantas usuarios: " + listaUsuariosPlants)
    console.log("zombies usuarios: " + listaUsuariosZombies)
}

// server Game

var salasAtivas = [];

const game = io.of('/game')

game.on('connection', socket => {
 
    console.log("conectado game")
    gameSocket(socket, salasAtivas);

});