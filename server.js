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

var listaTodosUsuario = [];
var listaUsuariosPlants = [];
var listaUsuariosZombies = [];
var listaUsuariosConvitesPendentes = [];
let ultimoUsuario = [];

// ao client se conectar
io.on('connection', socket => {

    //mandar historico
    socket.emit('previousPlants', listaUsuariosPlants);
    socket.emit('previousZombie', listaUsuariosZombies);
    socket.emit('previousPendentes', listaUsuariosConvitesPendentes);

    //mandar mensagem ultimo usuario conectado (provisorio)
    socket.on("messagemUsuario1", () => {

        console.log(ultimoUsuario[ultimoUsuario.length - 1]);

        if (ultimoUsuario[ultimoUsuario.length - 1] == socket.id) {
            socket.emit("oi");
        } else {
            socket.to(ultimoUsuario[ultimoUsuario.length - 1]).emit("oi");
        }

    });



    //açao para quando planta se conectar
    socket.on('plantConnected', (data) => {

        ultimoUsuario.push(socket.id);
        conectarUsuarioPlant(socket, data, listaUsuariosPlants, listaTodosUsuario);

    })

    //açao para quando zombie se conectar
    socket.on('zombieConnected', (data) => {

        ultimoUsuario.push(socket.id);
        conectarUsuarioZombie(socket, data, listaUsuariosZombies, listaTodosUsuario);

    })

    //recebe a mensagem que o client clicou em sair e pegar o id 
    socket.on('userDisconnect', () => {

        ultimoUsuario.pop();

        socket.broadcast.emit('receiveMessageDisconnect', socket.id)

        excluirUsuarioPlants(socket, listaUsuariosPlants);
        excluirUsuarioZombie(socket, listaUsuariosZombies);
        excluirUsuarioListaTodosUsuarios(socket);

   
    })


    //ao client se desconectar
    socket.on('disconnect', () => {

        ultimoUsuario.pop();

        socket.broadcast.emit('receiveMessageDisconnect', socket.id)

        excluirUsuarioPlants(socket, listaUsuariosPlants);
        excluirUsuarioZombie(socket, listaUsuariosZombies);
        excluirUsuarioListaTodosUsuarios(socket);
        
    })

    //cancelar pendente   
    socket.on('cancelarPendente', (usuarios) => {
    
        //apaga da lista
        let index = listaUsuariosConvitesPendentes.findIndex(user => user == usuarios.id1);

        if (index !== -1) {
            listaUsuariosConvitesPendentes.splice(index, 1);
        }

        index = listaUsuariosConvitesPendentes.findIndex(user => user == usuarios.id2);

        if (index !== -1) {
            listaUsuariosConvitesPendentes.splice(index, 1);
        }

        //cancela para todos conectados o pendente

        socket.broadcast.emit("cancelaPendente", usuarios);
        socket.emit("cancelaPendente", usuarios);

        //cancelar pendente convite
        socket.to(usuarios.id1).emit("cancelaPendenteConvite", usuarios.id2);



    });

    //convidar usuario para jogar
    socket.on('convidarParaJogar', (usuarioConvidado) => {

        let quemConvidou = listaTodosUsuario.find(user => user.socketID == socket.id);

        console.log("quem convidou: " + quemConvidou.nome + " para " + usuarioConvidado);

        let infoConvite = {nome: quemConvidou.nome, id: quemConvidou.socketID, posicao: quemConvidou.posicao, usuarioConvidado: usuarioConvidado}

       console.log(infoConvite.posicao)

       socket.to(usuarioConvidado).emit("receiveConvite", infoConvite);
       socket.broadcast.emit('convitePendente', infoConvite)
        socket.emit('convitePendente', infoConvite);

        listaUsuariosConvitesPendentes.push(socket.id);
        listaUsuariosConvitesPendentes.push(usuarioConvidado);
    });



});

function excluirUsuarioListaTodosUsuarios(socket){

    let index = listaTodosUsuario.findIndex(user => user.socketID == socket.id);

    if (index !== -1) {
        listaTodosUsuario.splice(index, 1);
    }

}


function testeConsole(){
    console.log("todos usuarios: " + listaTodosUsuario) 
    console.log("plantas usuarios: " + listaUsuariosPlants) 
    console.log("zombies usuarios: " + listaUsuariosZombies) 
}

server.listen(3000, () => console.log("Servidor rodando na porta 3000"));


