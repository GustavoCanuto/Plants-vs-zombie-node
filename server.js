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

}
);


let listaUsuariosConectados = [];

let listaUsuariosPlants = [];
let listaUsuariosZombies = [];

let ultimoUsuario = [];

// ao client se conectar
io.on('connection', socket => {

  
    
    console.log(`socket conectado ${socket.id}`);

    //mandar mensagem ultimo usuario conectado
    socket.on("messagemUsuario1", () => {

        console.log(ultimoUsuario[ultimoUsuario.length - 1]);
        
        if (ultimoUsuario[ultimoUsuario.length - 1] == socket.id) {
            socket.emit("oi");
        } else {
            socket.to(ultimoUsuario[ultimoUsuario.length - 1]).emit("oi");
        }

    });

    socket.emit('previousPlants', listaUsuariosPlants);
    socket.emit('previousZombie', listaUsuariosZombies);

    //açao para quando planta se conectar
    socket.on('plantConnected', (data) => {

        ultimoUsuario.push(socket.id);

        let ipMaquina = socket.handshake.address;
        data.ipMaquina = ipMaquina;

        listaUsuariosPlants.push(data);
       
        socket.broadcast.emit('receivePlant', data)

     //   socket.emit('atualizarClicavel');
        socket.broadcast.emit('atualizarClicavel');
        
    })

     //açao para quando zombie se conectar
    socket.on('zombieConnected', (data) => {

        ultimoUsuario.push(socket.id);

        let ipMaquina = socket.handshake.address;
        data.ipMaquina = ipMaquina;

        listaUsuariosZombies.push(data);
       
        socket.broadcast.emit('receiveZombie', data)

      //  socket.emit('atualizarClicavel');
        socket.broadcast.emit('atualizarClicavel');
       

    })


    //recebe a mensagem que o client clicou em sair e pegar o id que o client mandou, atualizar
    //todos o clients com a nova informação mandando o receiveMessage
    socket.on('userDisconnect', data => {

        ultimoUsuario.pop();

        socket.broadcast.emit('receiveMessageDisconnect', socket.id)
 
        let indexPlant = listaUsuariosPlants.findIndex(user => user.socketID == socket.id);

        
        let indexZombie = listaUsuariosZombies.findIndex(user => user.socketID == socket.id);
        

        if (indexPlant !== -1) {
            listaUsuariosPlants.splice(indexPlant, 1);
        }

        if (indexZombie !== -1) {
            listaUsuariosZombies.splice(indexZombie, 1);
        }

    })


    //ao client se desconectar
    socket.on('disconnect', () => {

        ultimoUsuario.pop();

        socket.broadcast.emit('receiveMessageDisconnect', socket.id)
 
        let indexPlant = listaUsuariosPlants.findIndex(user => user.socketID == socket.id);

        
        let indexZombie = listaUsuariosZombies.findIndex(user => user.socketID == socket.id);
        

        if (indexPlant !== -1) {
            listaUsuariosPlants.splice(indexPlant, 1);
        }

        if (indexZombie !== -1) {
            listaUsuariosZombies.splice(indexZombie, 1);
        }

    }
    )

}

);



server.listen(3000, () => console.log("Servidor rodando na porta 3000"));


