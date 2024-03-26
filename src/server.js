import express from "express";
import url from "url";
import path from "path";
import http from "http";
import { Server } from "socket.io";

const app = express();
const porta = process.env.PORT || 3000;

const caminhoAtual = url.fileURLToPath(import.meta.url);

const diretorioPublicoTelaInicio = path.join(caminhoAtual, "../../", "public");
app.use(express.static(diretorioPublicoTelaInicio));

const servidorHttp = http.createServer(app);


servidorHttp.listen(porta, () => console.log("Servidor rodando na porta 3000"));

const io = new Server(servidorHttp);

export default io;



