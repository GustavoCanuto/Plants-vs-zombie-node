const express = require('express'); //servidor
const path = require('path'); // setar diretorio das view

const session = require('express-session'); // middleware para gerenciar sessões
const bodyParser = require('body-parser'); //  middleware para analisar o corpo das solicitações HTTP


const { Socket } = require('socket.io');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);


app.use(session({ 
    secret: 'chave-da-sessao',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));


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

// ao client se conectar
io.on('connection', socket => {

  
  
   
    console.log(`socket conectado ${socket.id}`);


    socket.emit('previousMessages', listaUsuariosConectados);




    //recebe a mensagem que o client clicou em ENTRAR e pegar o id que o client mandou, atualizar
    //todos o clients com a nova informação mandando o receiveMessage
    socket.on('userConnected', (data) => {

      

        listaUsuariosConectados.push(data);
        socket.broadcast.emit('receiveMessage', data)


    })


    //recebe a mensagem que o client clicou em sair e pegar o id que o client mandou, atualizar
    //todos o clients com a nova informação mandando o receiveMessage
    socket.on('userDisconnect', data => {


        console.log(data + " : desconectado");

        let index = listaUsuariosConectados.findIndex(user => user.socketID == data);

        socket.broadcast.emit('receiveMessageDisconnect', data)

        if (index !== -1) {
            listaUsuariosConectados.splice(index, 1);
        }

       
    })


    //ao client se desconectar
    socket.on('disconnect', () => {


        let index = listaUsuariosConectados.findIndex(user => user.socketID == socket.id);

        socket.broadcast.emit('receiveMessageDisconnect', socket.id)

        if (index !== -1) {
            listaUsuariosConectados.splice(index, 1);
        }

    }
    )

}

);



server.listen(3000, () => console.log("Servidor rodando na porta 3000"));

