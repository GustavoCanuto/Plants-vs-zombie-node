const express = require('express');
const path = require('path');

const app = express();
const port = 3000; 

app.use(express.static(path.join(__dirname, 'public'))); // Define o diretório 'public' como conteúdo estático

app.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Envia o arquivo HTML para a rota raiz
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
