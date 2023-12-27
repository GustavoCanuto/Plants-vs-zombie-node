const express = require('express');
const http = require('http'); // Importe o módulo http do Node.js
const socketio = require('socket.io'); // Importe o Socket.io
const path = require('path');

const app = express();
const port = 3000;

const server = http.createServer(app); // Crie um servidor HTTP usando o app do Express
const io = socketio(server); // Inicialize o Socket.io no servidor

app.use(express.static(path.join(__dirname, 'public')));

app.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Adicione um evento de conexão para o Socket.io
io.on('connection', (socket) => {
  console.log('Nova conexão estabelecida:', socket.id);
  
  // Exemplo de evento de recebimento e retransmissão de um card colocado no tabuleiro
  socket.on('draggedItem', (data) => {
    // Transmita para todos os clientes, exceto o remetente original
    socket.broadcast.emit('itemPlaced', data);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
