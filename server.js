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

    socket.emit('previousMessages', listaUsuariosConectados);

    //recebe a mensagem que o client clicou em ENTRAR e pegar o id que o client mandou, atualizar
    //todos o clients com a nova informação mandando o receiveMessage
    socket.on('userConnected', (data) => {

        ultimoUsuario.push(socket.id);

        let ipMaquina = socket.handshake.address;
        data.ipMaquina = ipMaquina;

        listaUsuariosConectados.push(data);
        socket.emit('receiveMessage', data)
        socket.broadcast.emit('receiveMessage', data)
        console.log(data);

    })


    //recebe a mensagem que o client clicou em sair e pegar o id que o client mandou, atualizar
    //todos o clients com a nova informação mandando o receiveMessage
    socket.on('userDisconnect', data => {

        ultimoUsuario.pop();

        console.log(data + " : desconectado");

        let index = listaUsuariosConectados.findIndex(user => user.socketID == data);

        socket.broadcast.emit('receiveMessageDisconnect', data)

        if (index !== -1) {
            listaUsuariosConectados.splice(index, 1);
        }


    })


    //ao client se desconectar
    socket.on('disconnect', () => {

        ultimoUsuario.pop();

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






// //codigo referencia 1

// // const { Socket } = require('engine.io');

// // const app = require('express')();
// // const http = require('http').createServer(app);

// // const io = require('socket.io')(http)

// // app.get('/', (req, res) =>{
// //     res.sendFile(__dirname+'/index.html')
// // })

// // io.on('connection', (socket)=>{
// //     console.log('new connection', socket.id);
// //     socket.on('msg', (msg)=>{
// //         console.log(msg);
// //         socket.broadcast.emit('msg', socket.id + 'connected')
// //     })
// // })

// // http.listen(3000, function(){
// //     console.log('Listening on port 3000')
// // })



//ref dois (victor)

// const express = require('express'); // framework web que usei para criar o servidor
// const session = require('express-session'); // middleware para gerenciar sessões
// const bodyParser = require('body-parser'); //  middleware para analisar o corpo das solicitações HTTP
// const app = express();

// let users = {}; // Objeto para armazenar os usuários

// // configurando sessao

// app.use(session({
//   secret: 'chave-da-sessao', // string secreta que é usada para assinar o cookie de sessão
//   resave: false, //  Esta opção força a sessão a ser salva de volta na sessão
//   saveUninitialized: true // Esta opção força uma nova sessão que não foi inicializada
// }));

// // configurando o middleware body-parser para analisar o corpo das solicitações HTTP que estão codificadas em urlencoded

// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   if(req.session.user) {
//     res.send(`
//       <html>
//         <body>
//           <button onclick="window.location.href='/users';">Ver Usuários</button>
//           <p>Usuário: ${req.session.user}</p>
//         </body>
//       </html>
//     `);
//   } else { // caso seja o primeiro acesso a pessoa sera encaminhada a tela de login
//     res.send(`
//       <html>
//         <body>
//           <form method="post" action="/login">
//             <input type="text" name="user" placeholder="Digite seu nome de usuário" required>
//             <button type="submit">Entrar</button>
//           </form>
//         </body>
//       </html>
//     `);
//   }
// });

// // pagina de login

// app.post('/login', (req, res) => {
//   req.session.user = req.body.user; // armazena o nome do usuário enviado no formulário
//   req.session.views = 1; // inicializa o contador de visitas
//   users[req.session.user] = req.session.views; // Adiciona o usuário ao objeto de usuários
//   res.redirect('/');
// });

// //lista de usuarios

// app.get('/users', (req, res) => {
//   res.send(users); // Retorna a lista de usuários
// });

// // definindo a porta padrao como 3000

// app.listen(3000, () => {
//   console.log('Aplicação rodando na porta 3000');
// });