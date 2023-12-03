const express = require('express');
const path = require('path');

const { Socket } = require('socket.io');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) =>
{
    res.render('index.html');
}
);

let listaUsuariosConectados = [];

// ao client se conectar
io.on('connection', socket =>{
    console.log(`socket conectado ${socket.id}`);

    socket.emit('previousMessages', listaUsuariosConectados);

    //recebe a mensagem que o client clicou em jogar e pegar o id que o client mandou, atualizar
    //todos o clients com a nova informação mandando o receiveMessage
    socket.on('userConnected', data =>{
        listaUsuariosConectados.push(data);
        socket.broadcast.emit('receiveMessage', data)
    })


    //recebe a mensagem que o client clicou em sair e pegar o id que o client mandou, atualizar
    //todos o clients com a nova informação mandando o receiveMessage
    socket.on('userDisconnect', data =>{

        console.log(data+ " : desconectado");

        let index = listaUsuariosConectados.indexOf(data);

        socket.broadcast.emit('receiveMessageDisconnect', data)

        if (index !== -1) {
            listaUsuariosConectados.splice(index, 1);
        }

        
    })


    //ao client se desconectar
    socket.on('disconnect', () =>
    {
        console.log("Guest0"+socket.id.substr(0,5) +" : desconectado");

        let index = listaUsuariosConectados.indexOf("Guest0"+socket.id.substr(0,5));
        
        socket.broadcast.emit('receiveMessageDisconnect', listaUsuariosConectados[index])

        if (index !== -1) {
            listaUsuariosConectados.splice(index, 1);
        }

    }
    )

}

);



server.listen(3000, ()=> console.log("Servidor rodando na porta 3000"));











//codigo referencia 1

// const { Socket } = require('engine.io');

// const app = require('express')();
// const http = require('http').createServer(app);

// const io = require('socket.io')(http)

// app.get('/', (req, res) =>{
//     res.sendFile(__dirname+'/index.html')
// })

// io.on('connection', (socket)=>{
//     console.log('new connection', socket.id);
//     socket.on('msg', (msg)=>{
//         console.log(msg);
//         socket.broadcast.emit('msg', socket.id + 'connected') 
//     })
// })

// http.listen(3000, function(){
//     console.log('Listening on port 3000')
// })