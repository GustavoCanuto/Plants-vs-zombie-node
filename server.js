const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//renderizando view
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {

    res.render('index.html');

});

const { excluirUsuarioPlants, conectarUsuarioPlant } = require('./serverFunctionsPlants');
const { excluirUsuarioZombie, conectarUsuarioZombie } = require('./serverFunctionsZombies');
const { excluirUsuarioListaTodosUsuarios, excluirConvitePendente } = require('./serverFunctionsGeral');

var listaTodosUsuario = [];
var listaUsuariosPlants = [];
var listaUsuariosZombies = [];
var listaUsuariosConvitesPendentes = [];

// ao client se conectar
io.on('connection', socket => {

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

        desconectarUsuario(usuarios.id1);
        desconectarUsuario(usuarios.id2);

        socket.broadcast.emit('receiveusuarioDisconnect', usuarios.id1)
        socket.broadcast.emit('receiveusuarioDisconnect', usuarios.id2)

        socket.to(usuarios.id1).emit('telaJogo');
        socket.emit('telaJogo');

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
    });

    //ao clicar em sair
    socket.on('userDisconnect', () => {
        socket.broadcast.emit('receiveusuarioDisconnect', socket.id)
        desconectarUsuario(socket.id);
    });

    //ao client se desconectar
    socket.on('disconnect', () => {
        socket.broadcast.emit('receiveusuarioDisconnect', socket.id)
        desconectarUsuario(socket.id);
    });

});

function desconectarUsuario(socketID) {

    excluirUsuarioPlants(socketID, listaUsuariosPlants);
    excluirUsuarioZombie(socketID, listaUsuariosZombies);
    excluirUsuarioListaTodosUsuarios(socketID, listaTodosUsuario);

}

//verficar lista atualizada de usuarios
function testeConsole() {
    console.log("todos usuarios: " + listaTodosUsuario)
    console.log("plantas usuarios: " + listaUsuariosPlants)
    console.log("zombies usuarios: " + listaUsuariosZombies)
}

server.listen(3000, () => console.log("Servidor rodando na porta 3000"));


